{


    const crypto = require('crypto').randomBytes(256).toString('hex'); //encryption method

    module.exports = {
        //uri: 'mongodb://localhost:27017/mylistingappdb', //development
        uri: 'mongodb://listingapp-db:listingapp-1234567@ds119078.mlab.com:19078/mylistingappdb',
        sercret: crypto,
        db: 'mylistingappdb',
        paths    : {
            // path for pets images
            serverPath      : '../server/app',
            imagePath       : 'public/uploads/forms/',
            profileImagePath: 'public/uploads/profiles/',
            tmpImagePath    : 'public/uploads/tmp/',
            dist            : '../dist',
            expressUploads  : '/uploads',
            emailPath       : 'server/views/email_templates/',
        }

    }
}