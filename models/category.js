const Product = require('./product');
const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const  Schema = mongoose.Schema;

const  categorySchema = new Schema({
    name:{type:String , require:true , unique:true },
    slug: String,
    info: String,
    parentCategory: Number,
    image: String,
    uid: String,
    category: Number,
    active: { type: Boolean, default: true },
    createAt: {type: Date, default: Date.now},
    sub_categories: [{}]


});

module.exports = mongoose.model('Category' , categorySchema);
