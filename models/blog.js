const mongoose =  require('mongoose');
 mongoose.Promise = global.Promise;

const  Schema = mongoose.Schema;


let titleLenghtChacker  = (title)=>{
    if(!title){
        return false;
    }else {
        if(title.length<5 || title.length>150){
            return false;
        }else {
            return true;
        }
    }
};

let alphanumericChecker = (title) => {
    if(!title){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title);
    }
};


let bodyLenghtChacker  = (body)=>{
    if(!body){
        return false;
    }else {
        if(body.length<5 || body.length>500){
            return false;
        }else {
            return true;
        }
    }
};

let commentLenghtChacker  = (comment)=>{
    if(!comment[0]){
        return false;
    }else {
        if(comment[0].length<1 || comment[0].length>200){
            return false;
        }else {
            return true;
        }
    }
};


// let commentLenghtChacker  = (comment)=>{
//
//
//     if (comment[0].length < 6) {
//         console.log('fail');
//     }
//     else {
//         console.log('succ ');
//     }
//
//
// };
//



let commentBodyChecker = (comment) => {
    if(!comment){
        return false;
    }else{
        //const regExp = new RegExp(/^[a-zA-Z0-9!@#$%&*_?., ]+$/);
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(comment);
    }
};


let creatorLenghtChacker  = (createdBy)=>{
    if(!createdBy){
        return false;
    }else {
        if(createdBy.length<1 || createdBy.length>50){
            return false;
        }else {
            return true;
        }
    }
};




const creatorValidator = [
    {
        validator:creatorLenghtChacker , message:"Creator must be greater  than 1 character and less than 50 character"
    }

];

const bodyValidator = [
    {
        validator:bodyLenghtChacker , message:"Body  must be greater  than 5 character and less than 500 character"
    }

];

const titleValidator = [
    {
        validator:titleLenghtChacker , message:"Title must be greater than 5 character and less than 150 character"
    },
    {
        validator:alphanumericChecker , message:"Title only contain number and character"
    }
];

const commentValidator = [
    {
        validator:commentLenghtChacker , message:"Title must be greater than 5 character and less than 200 character"
    }
     ,
    {
        validator:commentBodyChecker , message:"Comment contains only ache ache words :P"
    }

];



const  blogSchema = new Schema({
    title:{type:String , require:true ,validate:titleValidator},
    body:{type:String , require:true  , validate:bodyValidator},
    createdBy:{type:String , require:true ,validate:creatorValidator},
    createAt:{type:Date , default:Date.now() },
    likes:{type:Number , default:0},
    likeBy:{type:Array},
    dislikes:{type:Number , default:0},
    dislikeBy:{type:Array},
    comments:[
        {
        comment:{type:String , validate:commentValidator},
        commentator:{type:String},
        }
    ]
});

module.exports = mongoose.model('Blog' , blogSchema);
