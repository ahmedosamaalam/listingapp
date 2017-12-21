let express = require('express'),
    fs      = require('fs'),
    fse     = require('fs-extra'),
    mkdirP  = require('mkdirp'),
    multer = require('multer'),
    crypto  = require('crypto'),
    mime    = require('mime'),
    path    = require('path'),
    config  = require('../config/database')





const  User = require('../models/user');
const  Form = require('../models/form');
const  Category = require('../models/category');




module.exports = (router) => {



    // Set The Storage Engine
    const storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function(req, file, cb){
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    // Init Upload
    const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
        fileFilter: function(req, file, cb){
            checkFileType(file, cb);
        }
    }).single('fileInput');


// Check File Type
    function checkFileType(file, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if(mimetype && extname){
            return cb(null,true);
        } else {
            cb('Error: Images Only!');
        }
    }



    router.post('/upload',  function(req, res) {

    console.log('asdfasdf');
        upload(req, res, function(err) {
            if (err) {
                // An error occurred when uploading
               console.log('errrrr'+err)
            }else {
                res.send(req.file);
            }

        });
    });






    return router;
}

