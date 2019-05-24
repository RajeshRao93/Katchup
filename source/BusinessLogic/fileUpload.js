const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
    secretAccessKey: 'msBwUdePvVzG7fS5+JjmegWVErjQVJoPZB6fgiT4',
    accessKeyId: 'AKIAJ7XWTKTYXVJJAZNQ',
    region: 'us-east-1'
});

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'nodejsserver',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  }),
  limits: {fileSize : 1000000},          //1MB limit
  fileFilter: function(req, file, cb){
      checkFileType(file, cb);
  }
});


//Check file type
function checkFileType(file, cb){
    //Allowed extensions
    const fileTypes = /jpeg|png|jpg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);
    if(mimeType && extname){
        return cb(null, true)
    }else{
        cb("Invalid image type..")
    }
    
};

module.exports = upload;