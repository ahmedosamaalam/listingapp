const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const  Schema = mongoose.Schema;

const  serviceSchema = new Schema({
    name:{type:String , require:true ,minlength:2 , maxlength:120},
    description:{type:String , require:true ,minlength:10 , maxlength:256},
    location:{type:String ,require:true },
    img: { type:String },
    phone:{type:Number , require:true},
    category : { type:String , require:true },
    createdBy:{type:String , require:true },
    createAt:{type:Date , default:Date.now() },
    likes:{type:Number , default:0},
    dislikes:{type:Number , default:0},
    comments:[
        {
            comment:{type:String },
            commentator:{type:String},
        }
    ],
    rating:[
        {
            rate:{type:Number },
            count:{type:Number,default:0},
        }
    ],

});

module.exports = mongoose.model('Service' , serviceSchema);
