const Category = require('./category');
const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const  Schema = mongoose.Schema;


const  productSchema = new Schema({
    name:{type:String , require:true ,minlength:3 , maxlength:80    },
    slug:{type:String  },
    description:{type:String ,require:true  ,minlength:10 , maxlength:256  },
    price:{type:Number ,require:true , min:1 , max:9999 },
    manufacture:{type:String  , default:'unknown'},
    phone:{type:Number , require:true},
    img: { type:String  },
    // category : { type: Schema.Types.ObjectId, ref: 'Category' },
   // category: {_id: String, name: String, slug: String, category: String, parentCategory: String, },
    category : { type:String,require:true},
    createdBy:{type:String },
    createAt:{type:Date , default:Date.now() },
    likes:{type:Number , default:0},
    //rating:{type:Number},
    rating:[
            {
                rate:{type:Number },
                count:{type:Number,default:0},
            }
        ],

    dislikes:{type:Number , default:0},
    active: { type: Boolean, default: true },
    comments:[
        {
            comment:{type:String },
            commentator:{type:String},
        }
    ],

});

module.exports = mongoose.model('Product' , productSchema);
