const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/postgres"; //for docker hosted db

module.exports = function Signup(userName, password, pinCode, contactNumber, email){
    return new Promise((resolve, reject) =>{
        
    const db = pg(conString); 
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('signupuser', [userName, pinCode, contactNumber, email, password])   
        .then (function (data) { 
            resolve("User Signed up...");
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