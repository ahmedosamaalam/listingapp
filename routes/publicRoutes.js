
const  User = require('../models/user');
const  Category = require('../models/category');
const  Product = require('../models/product');
const  Service = require('../models/service');
// const  jwt = require('jsonwebtoken');
// const  config =  require('../config/database');



module.exports = (router) => {

    router.get('/allProducts/:id' ,(req, res)=>{


                   //     res.send(req.params.id);

                    Product.find({category:req.params.id} ,(err , product)=>{
                        if(err){
                            console.log('Err hai bhai '+err);
                        }else {
                            if(!product){
                                res.status(400).json({success:false , message:'product not found'});
                            }else {

                                //  res.send(product);
                                res.status(200).json({success:true , product:product});
                            }
                        }
                    }).sort({_id:-1})

    });

    router.get('/allService/:id' ,(req, res)=>{

                    Service.find({category:req.params.id} ,(err , service)=>{
                        if(err){
                            console.log('Err hai bhai '+err);
                        }else {
                            if(!service){
                                res.status(400).json({success:false , message:'service not found'});
                            }else {

                                res.status(200).json({success:true , service:service});
                            }
                        }
                    }).sort({_id:-1})

    });


    router.get('/Products' ,(req, res)=>{


        //     res.send(req.params.id);

        Product.find({} ,(err , product)=>{
            if(err){
                console.log('Err hai bhai '+err);
            }else {
                if(!product){
                    res.status(400).json({success:false , message:'product not found'});
                }else {

                    //  res.send(product);
                    res.status(200).json({success:true , product:product});
                }
            }
        }).sort({_id:-1})

    });


    router.get('/Service' ,(req, res)=>{

        Service.find({} ,(err , service)=>{
            if(err){
                console.log('Err hai bhai '+err);
            }else {
                if(!service){
                    res.status(400).json({success:false , message:'service not found'});
                }else {

                    res.status(200).json({success:true , service:service});
                }
            }
        }).sort({_id:-1})

    });


    router.get('/product/:id' ,(req, res)=>{


        //     res.send(req.params.id);

        Product.find({_id:req.params.id} ,(err , product)=>{
            if(err){
                console.log('Err hai bhai '+err);
            }else {
                if(!product){
                    res.status(400).json({success:false , message:'product not found'});
                }else {

                    //  res.send(product);
                    res.status(200).json({success:true , product:product});
                }
            }
        }).sort({_id:-1})

    });

    router.get('/service/:id' ,(req, res)=>{

        Service.find({_id:req.params.id} ,(err , service)=>{
            if(err){
                console.log('Err hai bhai '+err);
            }else {
                if(!service){
                    res.status(400).json({success:false , message:'service not found'});
                }else {

                    res.status(200).json({success:true , service:service});
                }
            }
        }).sort({_id:-1})

    });

    router.post('/ss' ,(req ,res)=>{

      var s  = req.body.search

            Service.find({ 'name': new RegExp(s, 'i') }  ,(err, service)=>{
            if(err){
                res.send('error');
            }else {
                if(!service){
                    res.status(400).json({success:false , message:'service not found'});
                }else {
                    res.status(200).json({success:true , service:service});
                }
            }
        });

    });









    router.post('/sp' ,(req ,res)=>{

        var s  = req.body.search;

        Product.find({ 'name': new RegExp(s, 'i') } ,(err, product)=>{
            if(err){
                res.send('error');
            }else {
                if(!product){
                    res.status(400).json({success:false , message:'product not found'});
                }else {
                    res.status(200).json({success:true ,product:product});

                }
            }
        });

    });



    router.put('/rateProduct' , (req , res)=>{

        if(!req.body._id){
            res.json({success:false ,message:'id not found'});
        }else {

            Product.findOne({_id : req.body._id} ,(err, product)=>{
                if(err){
                    res.json({success:false ,message:'err'+err});
                }else {
                    if (!product){
                        res.json({success:false ,message:'product not found'});
                    }else {


                        count = product.rating.length;
                        product.rating.push({
                            rate:req.body.rate,
                            count:count+1
                        });


                            product.save((err)=>{
                                if(err){
                                    res.json({success:false ,message:'err'+err});
                                }else {
                                    res.status(200).json({success:true ,product:product});
                                }
                            })

                    }
                }

            });
        }

    });



    router.get('/getRateProduct/:id' , (req , res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {

            Product.findOne({_id : req.params.id} ,(err, product)=>{
                if(err){
                    res.json({success:false ,message:'err'+err});
                }else {
                    if (!product){
                        res.json({success:false ,message:'product not found'});
                    }else {

                        res.status(200).json({success:true ,product:product});


                    }
                }

            });
        }

    });



    router.put('/rateService' , (req , res)=>{

        if(!req.body._id){
            res.json({success:false ,message:'id not found'});
        }else {

            Service.findOne({_id : req.body._id} ,(err, service)=>{
                if(err){
                    res.json({success:false ,message:'err'+err});
                }else {
                    if (!service){
                        res.json({success:false ,message:'product not found'});
                    }else {


                        count = service.rating.length;
                        service.rating.push({
                            rate:req.body.rate,
                            count:count+1
                        });


                        service.save((err)=>{
                            if(err){
                                res.json({success:false ,message:'err'+err});
                            }else {
                                res.status(200).json({success:true ,service:service});
                            }
                        })

                    }
                }

            });
        }

    });









    return router;
}
