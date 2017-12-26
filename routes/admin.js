const  User = require('../models/user');
const  Category = require('../models/category');
const  Product = require('../models/product');
const  Service = require('../models/service');

module.exports = (router )=>{

/*  ------------------------------------------------
  **************** User Section********************
  -------------------------------------------------*/

    router.get('/users' , (req , res)=>{

        User.find({} , (err , user)=>{
           if(err){
               res.send('Err h'+err)
           }else {
               if(!user){
                   res.status(404).json({success:false , message:'User not found'});
               }else {
                   res.status(200).json({success:true , user:user});
               }
           }


        });
    });

    router.put('/updateUser' , (req , res)=>{

        if(!req.body.id){
            res.json({success:false ,message:'Id not found'});
        }else {

                User.findOne({_id :req.body.id} , (err , user)=>{
                    if(err){
                        res.send('Err h'+err);
                    }else {
                        if(!user){
                            res.status(404).json({success:false , message:'User not found'});
                        }else {

                            user.status = req.body.status

                          //  res.send(user);

                            user.save((err)=>{
                                if(err){
                                    res.json({success:false , message:'can not save:'+err})
                                }else {
                                    res.status(200).json({success:true , message:'Status updated!'});
                                }
                            })

                        }
                    }

                });



        }

    });


    router.delete('/deleteUser/:id' , (req , res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'Id not found'});
        }else {

                User.findOne({_id :req.params.id} , (err , user)=>{
                    if(err){
                        res.send('Err h'+err)
                    }else {
                        if(!user){
                            res.status(404).json({success:false , message:'User not found'});
                        }else {

                            user.remove((err)=>{
                                if(err){
                                    res.json({success:false , message:'can not save'})
                                }else {
                                    res.json({success:true , message:'User Deleted!'});
                                }
                            })

                        }
                    }

                });

            }
    });


    /*  ------------------------------------------------
  **************** Product Section********************
  -------------------------------------------------*/

    router.get('/products' , (req , res)=>{

        Product.find({} , (err , product)=>{
            if(err){
                res.send('Err h'+err)
            }else {
                if(!product){
                    res.status(404).json({success:false , message:'product not found'});
                }else {
                    res.status(200).json({success:true , product:product});
                }
            }


        });
    });


    router.delete('/deleteProduct/:id' , (req , res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'Id not found'});
        }else {

            Product.findOne({_id :req.params.id} , (err , product)=>{
                if(err){
                    res.send('Err h'+err)
                }else {
                    if(!product){
                        res.status(404).json({success:false , message:'product not found'});
                    }else {

                        product.remove((err)=>{
                            if(err){
                                res.json({success:false , message:'can not save'})
                            }else {
                                res.json({success:true , message:'Product Deleted!'});
                            }
                        })

                    }
                }

            });

        }
    });


    /*  ------------------------------------------------
**************** Service Section********************
-------------------------------------------------*/


    router.get('/services' , (req , res)=>{

        Service.find({} , (err , service)=>{
            if(err){
                res.send('Err h'+err)
            }else {
                if(!service){
                    res.status(404).json({success:false , message:'service not found'});
                }else {
                    res.status(200).json({success:true , service:service});
                }
            }
        });
    });

    router.delete('/deleteService/:id' , (req , res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'Id not found'});
        }else {

            Service.findOne({_id :req.params.id} , (err , service)=>{
                if(err){
                    res.send('Err h'+err)
                }else {
                    if(!service){
                        res.status(404).json({success:false , message:'service not found'});
                    }else {

                        service.remove((err)=>{
                            if(err){
                                res.json({success:false , message:'can not save'})
                            }else {
                                res.json({success:true , message:'service Deleted!'});
                            }
                        })

                    }
                }

            });

        }
    });





    return router;
}