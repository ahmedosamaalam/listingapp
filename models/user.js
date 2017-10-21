var mongoose = require('mongoose');
const bcrypt  = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;


//Schema
const Schema   = mongoose.Schema;

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else {
        if(email.length < 5 || email.length > 30){
            return false;
        }
        else {
            return true;
        }
    }
};
let validEmailChecker = (email) => {
    if(!email){
        return false;
    }else{
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
           return regExp.test(email);
    }
}
let usernameLengthChecker = (username) =>{

    if(!username){
        return false;
    }else{
        if(username.length <4 || username.length > 35) {
            return false;
        }else {
            return true;
        }
    }
}
let validUsernameChecker = (username)=>{
    if(!username){
        return false;
    }else {
        const regExp = new RegExp (/^[A-Za-z0-9_]{3,35}$/);
        return regExp.test(username);
    }

}
let validPasswordChecker = (password)=>{
    if(!password){
        return false;
    }else {
        const regExp = new RegExp (/^[A-Za-z0-9!@#$%^&*()_]{6,20}$/);
        return regExp.test(password);
    }

}

const emailValidator = [
    {
        validator : emailLengthChecker , message: 'email must be greater than 5 character  but not be more then 30 '
    },
    {
        validator : validEmailChecker , message: 'Invalid Email , Please check the email address !'
    }
];
const usernameValidator = [
    {
        validator:usernameLengthChecker , message:'Username should be greater then 3 character but not more than 35'
    },
    {
        validator:validUsernameChecker , message:'Username only number , latter and _ without space!'
    }
];
const passwordValidator = [
    {
        validator:validPasswordChecker , message:'Password supports special characters and here min length 6 max 20 charters. '
    }
];

const userSchema = new Schema({
    username: { type: String , required: true , lowercase: true , unique: true , validate: usernameValidator } ,
    email: { type: String , required: true , lowercase: true , unique: true  ,validate:emailValidator} ,
    password: { type: String , required: true , validate:passwordValidator  },
    role: { type: String , required: true   },
});

//Schema middleware to encrypt password
    userSchema.pre('save',  function (next) {
        if (!this.isModified('password'))
            return next();

            //apply encryption
            bcrypt.hash(this.password, null ,null , (err, hash) => {
                 if(err) return next(err);

                // Store hash in your password DB.
                this.password = hash;
                next(); //Exit middleware
            });
    });


    // Compare password Method and return true or false
    userSchema.methods.comparePassword = function(password){
        return bcrypt.compareSync(password , this.password);
    }

module.exports = mongoose.model('User' , userSchema);