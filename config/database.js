{


    const crypto = require('crypto').randomBytes(256).toString('hex'); //encryption method

    module.exports = {
        uri: 'mongodb://localhost:27017/mylistingappdb',
        sercret: crypto,
        db: 'mylistingappdb'

    }
}