const  User = require('../models/user');
const  Product = require('../models/product');
const  Category = require('../models/category');
var fs = require('fs');

// const  jwt = require('jsonwebtoken');
// const  config =  require('../config/database');



module.exports = (router , path) => {

    router.post('/addProduct' , (req , res)=>{
      //  res.send('rest');
        const  imgPath = path.join(__dirname ,'../public/images/git.jpg    ');

        if(!req.body.name){
            res.json({success:false, message:'Please provide the title..'});
        }else {
            if(!req.body.description){
                res.json({success:false , message:'Please provide the description.'});
            }else{
                 if(!req.body.price){
                     res.json({success:false , message:'Please provide the price'});
                 }
                 else {
                     // if(!req.body.img){
                     //     res.json({success:false , message:'Please provide the image'});
                     // }
                     // else {
                         if(!req.body.category){
                             res.json({success:false , message:'Please provide the category'});
                         }
                         else {
                             if(!req.body.createdBy){
                                 res.json({success:false , message:'Creator required '});
                             }
                             else {




                                 const imgPath = 'public/images/'+req.body.img+'.jpg'
                                 const product = new Product({
                                     name:req.body.name,
                                     description:req.body.description,
                                     price:req.body.price,
                                     phone:req.body.phone,
                                     manufacture:req.body.manufacture,
                                     createdBy:req.body.createdBy,
                                   //  img: imgPath

                                 });

                                 //      product.img.data = fs.readFileSync(imgPath);
                                 //      product.img.contentType = 'image/jpg';

                                      Category.findOne({_id : req.body.category } , (err , category)=>{

                                          if(err){
                                              console.log('msla hai '+err)
                                          }else {
                                              if(!category){
                                                  res.json({success:false , message:'category not found!'});
                                              }else {

                                                  product.category = category._id

                                                  product.save((err)=>{
                                                      if(err){
                                                          console.log(err)
                                                      }else {
                                                          res.json({success:true , message:'product saved!'});
                                                      }
                                                  })

                                              }
                                          }

                                      });

                             }

                         }
                     }
                // }
                    }
                 }

    });

    router.get('/allProducts' ,(req, res)=>{

        User.findOne({_id : req.decoded.userID} , (err, user)=>{

            if(err){

                res.json({success:false , message:"invalid tokens-> from update blog post"});
            }else {

                if(!user){
                    res.json({success:false , message:"user not found"});
                }else {


                    Product.find({createdBy:user.username} ,(err , product)=>{
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

                    }
                }
        });

    });

    router.get('/edit-product/:id' ,(req, res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Product.findOne({_id:req.params.id} , (err , product)=>{

                if(err){
                    res.json({success:false ,message:'err '+err});
                }else {
                    if(!product){
                        res.status(404).json({success:false ,message:'Product not found'});
                    }else {

                        res.json({success:true, product:product});

                    }
                }
            });
        }

    });

    router.put('/updateProduct' , (req , res)=>{

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



                        product.name = req.body.name
                        product.description = req.body.description
                        product.price = req.body.price
                        product.manufacture = req.body.manufacture
                        product.category = req.body.category
                        product.phone = req.body.phone,

                        product.save((err)=>{
                            if(err){
                                res.json({success:false ,message:'err'+err});
                            }else {
                                res.status(200).json({success:true ,message:'Update product'});
                            }
                        })

                    }
                }

            });
        }

    });



    router.delete('/deleteProduct/:id', (req,res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Product.findOne({_id : req.params.id} ,(err , product)=>{
                if(err) {
                    res.json({success:false ,message:'eerr'+err});
                }else {
                    if(!product){
                        res.json({success:false ,message:'product not found'});
                    }else {
                        product.remove((err)=>{
                            if(err){
                                res.json({success:false ,message:'eerr'+err});
                            }else {
                                res.status(200).json({success:true , message:'product deleted'});
                            }
                        })
                    }
                }
            });
        }
    });





    return router;
}
