const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/Katchup";
var result = '';

function Postevent(eventname, eventdescription, date, time, eventtype, eventcategory,
    cost, userid, totalseats, pincode, premiumtype){

        return new Promise((resolve, reject) =>{
            const db = pg(conString);
            const status = 0;
            db.connect()
            .then(() => {
                console.log("Connection complete..");
                db.func('postevent', [eventname, eventdescription, date, time, eventtype, eventcategory,
                    cost,  userid, totalseats, pincode, premiumtype, status])   
                .then (function (data) {
                    result = {'userid' : userid, message : 'Data posted for evaluation..'}
                resolve(result)
            })
            .catch(function (err) {
                reject(err + "Error found in posting the event");
            })  
            pg.end();
        })
        .catch((err) => {
            reject(err + "Error found in posting the event");
        });
    });
}

module.exports = {
    Postevent
}