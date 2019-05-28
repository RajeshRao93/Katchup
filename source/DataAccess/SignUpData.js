const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/Katchup"; //for docker hosted db "postgres://postgres:postgres@192.168.99.100:5432/postgres";

function Signup(userName, password, pinCode, contactNumber, email){
    return new Promise((resolve, reject) =>{
        
    const db = pg(conString); 
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('signupuser', [userName, pinCode, contactNumber, email, password])   
        .then (function (data) { 
            db.any('SELECT email, name, user_id FROM users WHERE email = ${email}', { email: email }) 
            .then(function(res) {
                res[0].message = "User Signed up...";                    
                result = res[0];
                resolve(result);
            })
        })
        .catch(function (err) {
            reject("Error found in signup / User already found..");
        })  
             
    })    
    .catch((err) => {
        console.error("Error found in signup: ", err);
        reject("Error found in signup");
    })
    })    
}

function GetPincode(){
    var pincodes = {"pincodes":[]};
    return new Promise((resolve, reject) =>{
        
        const db = pg(conString); 
        db.connect()
        .then(() => {
            console.log("Connection complete......");
            db.any('SELECT pincode FROM locations')   
            .then (function (data) {
                data.forEach((element)=> {
                    pincodes.pincodes.push(element.pincode);
                });                
                resolve(pincodes);           
            })
            .catch(function (err) {
                reject(err + "Error found in GetPincode");
            })  
            pg.end();       
        })    
        .catch((err) => {
            console.error("Error found in signup: ", err);
            reject("Error found in signup");
        })
        });
}

module.exports = {
    Signup,
    GetPincode
 }