const  User = require('../models/user');


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




    return router;
}


//module.exports = function (route) {
  //  return route;
//}