const express = require('express') ;
const app = express();
const login = require('../DataAccess/LoginData.js');
const signupdata = require('../DataAccess/SignUpData.js');
const validations = require('../Utilities/Validator.js');
const postevent = require('../DataAccess/PostEvent.js')
const upload = require('./fileUpload');
const singleUpload = upload.single("image"); //Key to be used while sending request
app.use(express.json());
const port = 3005;

//sample
app.get('/get', (req,res)=>{
    res.send("Hola");
}) 


//FileUpload API
app.post('/imageupload', (req, res) => {

    singleUpload(req, res, (err) => {
        if(err)
        {    
            return res.status(400).send(err);
        }
        
        return res.json({'imageurl': req.file.location })
    });
});

//API to get all the available pincodes 
app.get('/getpincode', (req, res)=>{
    signupdata.GetPincode()
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
})

//Login API
//returns userid , email id, name, message
app.post('/login', (req, res) => { 
    
    try{
        validations.validateLoginInput(req, res);
    }
    catch(err){
        return res.status(400).send(JSON.stringify({message : err}))
    }
    login(req.body.userid, req.body.password)
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
});

//Signup API
//returns userid , email, name of the signed up used
app.post('/signup', (req,res) => {     
    
    try{
        validations.validateSignupInput(req, res) ;
    }
    catch(err){
           return res.status(400).send(JSON.stringify({message : err}))
    }
    signupdata.Signup(req.body.name, req.body.password, req.body.pinCode, req.body.contactNumber,
        req.body.email)
    .then((value) => {
        res.status(200).send(JSON.stringify({value}));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));    
});

//API for posting an event 
app.post('/postevent', (req, res) => {
    // try{
    //     validations.xx(req, res) ;
    // }
    // catch(err){
    //        return res.status(400).send(JSON.stringify({message : err}))
    // }
    postevent.Postevent(req.body.eventname, req.body.eventdescription, req.body.date, req.body.time, req.body.eventtype, req.body.eventcategory,
        req.body.cost, req.body.userid, req.body.totalseats, req.body.pincode, req.body.premiumtype)
        .then((value) => {
            res.status(200).send(JSON.stringify({value}));
        })
        .catch(err => res.status(400).send(JSON.stringify({message : err})));
    });

app.listen(port, ()=>{
    console.log("Server listening at port : " + port);
})