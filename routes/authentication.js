const  User = require('../models/user');
const  jwt  = require('jsonwebtoken');
const  config =  require('../config/database');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');


module.exports = ( router ) => {


    var options = {
        auth: {
            api_key: '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'
        }
    }

    var client = nodemailer.createTransport(sgTransport(options));


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
            role:req.body.role,
            temporarytoken: jwt.sign({email:req.body.email} , config.sercret , {expiresIn:'24h'} )

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

                    var email = {
                        from: 'ListingApp , info@listingapp.com',
                        to: user.email,
                        subject: 'Account verification ',
                        text: 'Thank '+user.username+' you for the registration. Please click this link to activate the account: http://localhost:4200/activate/'+user.temporarytoken,
                        html: 'Thank '+user.username+' you for the registration. Please click this link to activate the account <a href="http://localhost:4200/activate/'+ user.temporarytoken+' "> http://localhost:4200/activate  </a> '
                    };

                    client.sendMail(email, function(err, info){
                        if (err ){
                            console.log(err);
                        }
                        else {
                            console.log('Message sent: ' + info.response);
                        }
                    });


                    res.json({success: true, message: 'Account registerd. Please check your email for activation link.'});
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






    //this middleware disabled every time when we test the route in postman
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



    router.put('/activate/:token' , (req, res)=>{
        User.findOne({temporarytoken: req.params.token } , (err , user)=>{
            if (err){
                res.json({success:false , message:+err});
            }else {
                    const token = req.params.token;
                    jwt.verify(token , config.sercret , (err , decoded) =>{ //verify token
                        if(err){
                            res.json({success:false , message:'Activation link has expired: '+err})
                        }else if (!user) {
                            res.json({success:false , message:'Activation link has expired'})
                        }
                        else{

                            user.temporarytoken = false;
                            user.active = true;

                            user.save((err)=>{
                                if (err){
                                    console.log('database krne me error hai : '+err);
                                }else {



                                    var email = {
                                        from: 'ListingApp , info@listingapp.com',
                                        to: user.email,
                                        subject: 'Account activated ',
                                        text: 'Thank '+user.username+' your account has been activated.',
                                        html: 'Thank '+user.username+' your account has been activated.'
                                    };

                                    client.sendMail(email, function(err, info){
                                        if (err ){
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Message sent: ' + info.response);
                                        }
                                    });

                                    res.json({success:true , message:'Account activated!'});
                                }
                            });




                        }
                    })

                }

        })

    });



    router.get('/profile' , (req, res)=>{
       User.findOne({_id : req.decoded.userID}).select('username email role').exec((err, user)=>{
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



    router.get('/role', (req , res)=>{

        User.findOne({_id : req.decoded.userID} ,(err, user)=>{
            if(err){
                res.json({success:false ,  message:err})
            }else {
                if (!user){
                    res.json({success:false ,  message:'User not found'});
                }else {
                    res.json({success:true , role:user.role});
                }
            }
        });

    });







    return router;
}


//module.exports = function (route) {
  //  return route;
//}