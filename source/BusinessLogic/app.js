const express = require('express') ;
const app = express();
const login = require('../DataAccess/LoginData.js');
const signup = require('../DataAccess/SignUpData.js');
const upload = require('./fileUpload');
const singleUpload = upload.single("image"); //Key to be used while sending request
app.use(express.json());

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

//Login API
app.post('/login', (req, res) => { 
    
    try{
    validateLoginInput(req, res);
    }
    catch(err){
        return res.status(400).send(JSON.stringify({message : err}))
    }
    login(req.body.name, req.body.password)
    .then((value) => {
        res.status(200).send(JSON.stringify({message : value}));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
});

//Signup API
app.post('/signup', (req,res) => {
     
    
    try{
        validateSignupInput(req, res) ;
    }
    catch(err){
           return res.status(400).send(JSON.stringify({message : err}))
    }
    signup(req.body.name, req.body.password, req.body.pinCode, req.body.contactNumber,
        req.body.email)
    .then((value) => {
        res.status(200).send(JSON.stringify({message : value}));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));    
});

app.listen(3001, ()=>{
    console.log("Server listening at port 3001");
})

function validateSignupInput(req, res){
    if (!req.body.name || !req.body.password || !req.body.pinCode 
        || !req.body.contactNumber || !req.body.email){
        throw("Bad Request Missing input parameters.");
    }    
}

function validateLoginInput(req, res){
    if (!req.body.name || !req.body.password){
        throw("Bad Request Missing username/password.");
    }    
}
