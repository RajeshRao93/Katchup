function validateSignupInput(req, res){
    if (!req.body.name || !req.body.password || !req.body.pinCode 
        || !req.body.contactNumber || !req.body.email){
        throw("Bad Request Missing input parameters.");
    }    
}

function validateLoginInput(req, res){
    if (!req.body.userid || !req.body.password){
        throw("Bad Request Missing username/password.");
    }    
}

module.exports = {
    validateSignupInput,
    validateLoginInput
}