const  User = require('../models/user');
const  jwt  = require('jsonwebtoken');
const  config =  require('../config/database');

module.exports = ( router ) => {

    router.post('/register' , ( req , res  ) => {

    if(!req.body.username){
        res.json({success : false , message :'You must provide an username'});
        }else {
        if(!req.body.email){
            res.json({success : false , message :'You must provide an email'});
        }else {
            if(!req.body.password){
                res.json({success : false , message :'You must provide an password'});
            }else {


        let user  = new User({

            username:req.body.username.toLowerCase(),
            email:req.body.email.toLowerCase(),
            password:req.body.password,
            role:req.body.role

        });
            user.save((err) =>{
                if(err) {
                    if (err.code === 11000) {
                        res.json({success: false, message: 'username or email already exist'});
                    } else {
                        if (err.errors) {
                            if (err.errors.email) {
                                res.json({success: false, message: err.errors.email.message})
                            } else {
                                if(err.errors.username){
                                    res.json({ success:false, message:err.errors.username.message })
                                }else {
                                    if(err.errors.password){
                                        res.json({success:false , message:err.errors.password.message})
                                    }else {
                                        res.json({success: false, message: 'user could not be save : Error', err});
                                    }
                                }

                            }
                        }


                    }
                }else {
                    res.json({success: true, message: 'User saved '});
                }

            }); //user save method closed

            }//req.body.username , email , password closed and before let
        }
     }
    });

    router.post('/login' , (req , res)=>{
        if(!req.body.username){
            res.json({success:false , message:"you must provide an username"});
        }else{
            if(!req.body.password){
                res.json({success:false , message:"you must provide an  password"});
            } else {
               User.findOne({username:req.body.username.toLowerCase()} , (err, user) =>{
                   if(err){
                       res.json({success:false  , message:err});
                   }else {
                       if(!user){
                           res.json({success:false , message:"username not found"});
                       }else {
                           const validPassword = user.comparePassword(req.body.password);
                           if(!validPassword){
                               res.json({success:false , message:"invalid password"});
                           } else {

                               const  token =  jwt.sign({userID:user._id} , config.sercret , {expiresIn:'24h'} );

                               res.json({success:true, message:"Success!" , token:token , user:{username:user.username} });
                           }
                       }
                   }
               });
            }
        }
    });


    router.get('/checkUsername/:username' , (req, res) =>{

        if (!req.params.username){
            res.json({success:false ,message:'username not provided'});
        }else {
            User.findOne({username:req.params.username} , (err, user) =>{

                if(err){
                    res.json({success:false , message:err})
                }else{
                    if (user){
                        res.json({success:false , message:'username already taken '});
                    }else {
                        res.json({success:true , message:'username available '})
                    }
                }
            });
        }

    });

    router.get('/checkEmail/:email' , (req ,res ) =>{
        if(!req.params.email){
            res.json({success:false , message:'email was not provided'});
        }else{
            User.findOne({email: req.params.email} , (err,user)=>{
                if(err){
                    res.json({success:false , message:err})
                }else{
                    if(user){
                        res.json({success:false , message:'email already taken '});
                    }else{
                        res.json({success:true , message:'email available '})
                    }
                }
            })
        }

    });




    // Creating a middleware, grab those token( header)
    // for intercept angular header with express header
    // keep in mind any route comes after this middleware automatically run this middleware
    router.use((req, res, next)=>{
        //when angular 2 req with header , it automatically  going to search express header
       const token =  req.headers['authorization'] ; //express header and pass authorization that we created in angular header


       if(!token){ //check token
           res.json({success:false , message:'No token provide'});
       }else{
           jwt.verify(token , config.sercret , (err , decoded) =>{ //verify token
               if(err){
                   res.json({success:false , message:'Token invalid'+err})
               }else{
                   req.decoded = decoded; //valid token just assign global variable that access  in profile
                   next(); //exit
               }
           })
       }
    });


    router.get('/profile' , (req, res)=>{
       User.findOne({_id : req.decoded.userID}).select('username email').exec((err, user)=>{
           if(err){
               res.json({success:false ,  message:err})
           }else {
               if (!user){
                   res.json({success:false ,  message:'User not found'});
               }else {
                   res.json({success:true , user:user});
               }
           }
       });
    });






    return router;
}


//module.exports = function (route) {
  //  return route;
//}