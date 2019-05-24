const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/postgres"; //for docker hosted db
var result = '';

module.exports = function LoginUser(userName, password) {
    return new Promise((resolve, reject) => {
        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT * FROM users WHERE name = ${userName} AND password = ${password}', { userName: userName, password: password })
            .then (function (data) { 
                if(data.length == 1){
                    result = "User logged in!!";
                }                
                else result = "Log in rejected .. Incorrect username or password!!"; 
                            
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in login/ Incorrect username or password");
            })                               
        })
        .catch((err) => {
            console.error("Error found in login: ", err);
            reject("Error found in login/ Incorrect username or password");
        })      
    });
    
}