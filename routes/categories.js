const  User = require('../models/user');
const  Category = require('../models/category');
// const  jwt = require('jsonwebtoken');
// const  config =  require('../config/database');



module.exports = (router) => {

    router.post('/addCategory' , (req , res)=>{
       if(!req.body.name){
           res.status(400).json({success:false , message:'Please provide the category name'});
       }else {

           const categoryObj = new Category({
               name:req.body.name,
              // productID:req.body.products
           });

           categoryObj.save((err)=>{
               if(err){
                   res.status(400).json({success:false , message:'error hai'+err});
               }else {
                   res.status(200).json({success:true, message:'Category saved!'});
               }
           })
       }

    });

    router.get('/allCategory' ,(req, res)=>{

        Category.find({} ,(err , category)=>{
            if(err){
                console.log('Err hai bhai '+err);
            }else {
                if(!category){
                    res.status(400).json({success:false , message:'Category not found'});
                }else {
                    res.status(200).json({success:true , category:category});
                }
            }
        }).sort({_id:-1})
    });



    router.get('/edit-category/:id' ,(req, res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Category.findOne({_id:req.params.id} , (err , category)=>{

                if(err){
                    res.json({success:false ,message:'err '+err});
                }else {
                    if(!category){
                        res.status(404).json({success:false ,message:'user not found'});
                    }else {

                           res.json({success:true, category:category});

                    }
                }
            });
        }

    });






    router.put('/updateCategory' , (req , res)=>{

        if(!req.body._id){
            res.json({success:false ,message:'id not found'});
        }else {

            Category.findOne({_id : req.body._id} ,(err, category)=>{
               if(err){
                   res.json({success:false ,message:'err'+err});
               }else {
                   if (!category){
                       res.json({success:false ,message:'Category not found'});
                   }else {



                    category.name = req.body.name

                    category.save((err)=>{
                       if(err){
                           res.json({success:false ,message:'err'+err});
                       }else {
                           res.status(200).json({success:true ,message:'Update category'});
                       }
                    })

                   }
               }

            });
       }

    });



    router.delete('/deleteCategory/:id', (req,res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Category.findOne({_id : req.params.id} ,(err , category)=>{
               if(err) {
                   res.json({success:false ,message:'eerr'+err});
               }else {
                   if(!category){
                       res.json({success:false ,message:'Category not found'});
                   }else {
                       category.remove((err)=>{
                           if(err){
                               res.json({success:false ,message:'eerr'+err});
                           }else {
                               res.status(200).json({success:true , message:'Category deleted'});
                           }
                       })
                   }
               }
            });
        }
    });





    return router;
}
