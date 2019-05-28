const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/Katchup"; //for docker hosted db
var result = '';

module.exports = function LoginUser(userid, password) {
    return new Promise((resolve, reject) => {        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT email, name, user_id FROM users WHERE user_id = ${userid} AND password = ${password}', { userid: userid, password: password })
            .then (function (data) { 
                if(data.length == 1){
                    data[0].message = "User logged in!!";                    
                    result = data[0];
                }                
                else result = "Log in rejected .. Incorrect username or password!!"; 
                            
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in login/ Incorrect username or password");
            })
            pg.end();
        })
        .catch((err) => {
            console.error("Error found in login: ", err);
            reject("Error found in login/ Incorrect username or password");
        })      
    });
}