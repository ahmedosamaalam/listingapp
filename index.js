const  express   = require('express');
const  app       =  express();
const  mongoose  = require('mongoose');
const  config    = require('./config/database');
const  path       = require('path') ;

mongoose.Promise = global.Promise;

mongoose.connect( config.uri , (err)=>{
    if (err){
        console.log('Could not connected to the database');
    }else {

        console.log('connected to database : '+config.db);
    }
});


app.use(express.static(__dirname+'/client/dist/'));

app.get('*',(req , res )=>{
        res.sendFile(path.join(__dirname +'/client/dist/index.html'))
});

app.listen(9090 , () => {
    console.log('Server Stared at port  9090');
});
