//Core module
const  express    = require('express');
const  bodyParser = require('body-parser')
const  app        =  express();
const  mongoose   = require('mongoose');
const  router     = express.Router();
const  cors       = require('cors'); //Just for Development mode, client and server interaction

const  config     = require('./config/database');
const  path       = require('path') ;
const  categories = require('./routes/categories')(router);
const  publicRoutes = require('./routes/publicRoutes')(router);
const  authentication  = require('./routes/authentication')(router);
const  blog  = require('./routes/blogs')(router);
const  service  = require('./routes/services')(router);

const  form = require('./routes/form')(router);
const  admin = require('./routes/admin')(router);
const  products = require('./routes/productx')(router , path);

const  passport = require('passport')
const  social    = require('./passport/passport') (app , passport);



//database connection
mongoose.Promise = global.Promise;
mongoose.connection.openUri( config.uri , (err)=>{
    if (err){
        console.log('Could not connected to the database');
    }else {

        console.log('connected to database : '+config.db);
    }
});
//mongoose.connect(config.uri, { useMongoClient: true })

// //middleware for cors, Just for development mode
// app.use(cors({
//     origin: 'http://localhost:4200'
// }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());




//middleware static directory for frontend
app.use(express.static(__dirname+'/public'));

//public middleware
app.use('/publicRoutes',publicRoutes);
app.use('/blog' , blog );
app.use('/category' , categories );


//our custom authentication middleware ,API
app.use('/authentication' , authentication );
app.use('/service' , service );
app.use('/product', products);
app.use('/admin', admin);

app.get('*',(req , res )=>{
        res.sendFile(path.join(__dirname +'/public/index.html'))
});



//serverlisting
var port =  process.env.PORT || 1212;
app.listen( port , () => {
    console.log('Server Stared at port  : ' +port);
});
