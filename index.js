//Core module
const  express    = require('express');
const  bodyParser = require('body-parser')
const  app        =  express();
const  mongoose   = require('mongoose');
const  router     = express.Router();
const  cors       = require('cors'); //Just for Development mode, client and server interaction

const  config     = require('./config/database');
const  path       = require('path') ;

const  authentication  = require('./routes/authentication')(router);


//database connection
mongoose.Promise = global.Promise;
mongoose.connect( config.uri , (err)=>{
    if (err){
        console.log('Could not connected to the database');
    }else {

        console.log('connected to database : '+config.db);
    }
});

//middleware for cors, Just for development mode
app.use(cors({
    origin: 'http://localhost:4200'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//middleware static directory for frontend
app.use(express.static(__dirname+'/client/dist/'));

//our custom authentication middleware ,API
app.use('/authentication' , authentication );

app.get('*',(req , res )=>{
        res.sendFile(path.join(__dirname +'/client/dist/index.html'))
});

//serverlisting
var port =  process.env.PORT || 1212;
app.listen( port , () => {
    console.log('Server Stared at port  : ' +port);
});
