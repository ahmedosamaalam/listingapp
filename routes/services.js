const  User = require('../models/user');
const  Service = require('../models/service');
const  Category = require('../models/category');


module.exports = (router , path) => {


    // name:{type:String , require:true ,minlength:2 , maxlength:120},
    // description:{type:String , require:true ,minlength:10 , maxlength:256},
    // price:{type:Number , require:true , min:2 , max:9999},
    // location:{type:String ,require:true },
    // img: { data: Buffer, contentType: String },
    // phone:{type:number , require:true, min:7 , max:12},
    // category : { type:String , require:true },
    // createdBy:{type:String , require:true },




    router.post('/addService' , (req , res)=>{
        //  res.send('rest');
     //   const  imgPath = path.join(__dirname ,'../public/images/git.jpg    ');

        if(!req.body.name){
            res.json({success:false, message:'Please provide the title..'});
        }else {
            if(!req.body.description){
                res.json({success:false , message:'Please provide the description.'});
            }else{
                    if(!req.body.location){
                        res.json({success:false , message:'Please provide the location'});
                    }
                    else {
                    if(!req.body.phone){
                        res.json({success:false , message:'Please provide the phone'});
                    }
                    else {
                        if(!req.body.createdBy){
                            res.json({success:false , message:'Creator required '});
                        }
                        else {




                       //     const imgPath = 'public/images/'+req.body.img+'.jpg'
                            const service = new Service({
                                name:req.body.name,
                                description:req.body.description,
                                location:req.body.location,
                                phone:req.body.phone,
                                createdBy:req.body.createdBy,
                                //  img: imgPath

                            });


                            Category.findOne({_id : req.body.category } , (err , category)=>{

                                if(err){
                                    console.log('msla hai '+err)
                                }else {
                                    if(!category){
                                        res.json({success:false , message:'category not found!'});
                                    }else {

                                        service.category = category._id

                                        service.save((err)=>{
                                            if(err){
                                                console.log(err)
                                            }else {
                                                res.json({success:true , message:'service saved!'});
                                            }
                                        })

                                    }
                                }

                            });

                        }

                    }
                }
                 }
            }


    });

    router.get('/allService' ,(req, res)=>{

        User.findOne({_id : req.decoded.userID} , (err, user)=>{

            if(err){

                res.json({success:false , message:"invalid tokens-> from update service post"});
            }else {

                if(!user){
                    res.json({success:false , message:"user not found"});
                }else {


                    Service.find({createdBy:user.username} ,(err , service)=>{
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

                }
            }
        });

    });

    router.get('/edit-service/:id' ,(req, res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Service.findOne({_id:req.params.id} , (err , service)=>{

                if(err){
                    res.json({success:false ,message:'err '+err});
                }else {
                    if(!service){
                        res.status(404).json({success:false ,message:'service not found'});
                    }else {

                        res.json({success:true, service:service});

                    }
                }
            });
        }

    });

    router.put('/updateService' , (req , res)=>{

        if(!req.body._id){
            res.json({success:false ,message:'id not found'});
        }else {

            Service.findOne({_id : req.body._id} ,(err, service)=>{
                if(err){
                    res.json({success:false ,message:'err'+err});
                }else {
                    if (!service){
                        res.json({success:false ,message:'service not found'});
                    }else {




                        service.name =req.body.name,
                        service.description=req.body.description,
                        service.location=req.body.location,
                        service.phone=req.body.phone,
                        service.category=req.body.category,





                        service.save((err)=>{
                            if(err){
                                res.json({success:false ,message:'err'+err});
                            }else {
                                res.status(200).json({success:true ,message:'Update service'});
                            }
                        })

                    }
                }

            });
        }

    });



    router.delete('/deleteService/:id', (req,res)=>{

        if(!req.params.id){
            res.json({success:false ,message:'id not found'});
        }else {
            Service.findOne({_id : req.params.id} ,(err , service)=>{
                if(err) {
                    res.json({success:false ,message:'eerr'+err});
                }else {
                    if(!service){
                        res.json({success:false ,message:'service not found'});
                    }else {
                        service.remove((err)=>{
                            if(err){
                                res.json({success:false ,message:'eerr'+err});
                            }else {
                                res.status(200).json({success:true , message:'service deleted'});
                            }
                        })
                    }
                }
            });
        }
    });





    return router;
}
