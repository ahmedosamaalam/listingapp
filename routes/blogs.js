const  User = require('../models/user');
const  Blog = require('../models/blog');
const  jwt = require('jsonwebtoken');
const  config =  require('../config/database');


module.exports = (router) => {

    router.post('/newBlog', (req ,res)=>{

        if(!req.body.title){
            res.json({success:false , message:"title required"});
        }else {
            if(!req.body.body){
                res.json({success:false , message:"body required"});
            }else {
                if(!req.body.createdBy){
                    res.json({success:false , message:"creator required"})
                }else {

                    const blog = new Blog({
                        title:req.body.title,
                        body:req.body.body,
                        createdBy:req.body.createdBy
                    });

                    blog.save((err)=>{
                        if(err){
                           if(err.errors){
                               if(err.errors.title){
                                   res.json({success:false , message:err.errors.title.message});
                               }else {
                                   if(err.errors.body){
                                       res.json({success:false , message:err.errors.body.message});
                                   }else {
                                       if(err.errors.createdBy){
                                           res.json({success:false, message:err.errors.createdBy.message});
                                       }else {
                                           res.json({success:false , message:"error dhon"+err})
                                       }
                                   }
                               }
                           }else {
                               res.json({success:false , message:'error hai bhai'+err})

                           }
                        }
                        else {
                            res.json({success:true , message:"Blog saved!"})
                        }
                    });

                }
            }
        }


    });

    router.get('/getAllPosts', (req , res) =>{

       // res.send('testtt');

        Blog.find({} ,(err , blogs)=>{

            if(err){
            res.json({success:false , message:err});
            }else {
                if(!blogs){
                    res.json({success:false , message: "Blogs not found"});
                }else {
                    res.json({success:true , blogs:blogs})
                }
            }
        }).sort({ '_id':-1});

    });

    router.get('/singlePost/:id' , (req,res)=>{
        if(!req.params.id){
           res.json({success:false , message:"NO id was provide"});
        }else{

           Blog.findOne({_id : req.params.id} , (err , blog)=>{
               if(err){
                   res.json({success:false , message:'Invalid id'});
               }else{
                   if(!blog){
                     res.json({success:false , message:"Blog not found"});
                   }else{
                       // res.send(req.params.id);
                       User.findOne({_id : req.decoded.userID} , (err, user)=>{
                           if(err){
                               res.json({success:false , message:"invalid tokens-> from edit blog post"});
                           }else {
                               if(!user){
                                   res.json({success:false , message:"user not found"});
                               }else {
                                   if(user.username !== blog.createdBy){
                                       res.json({success:false , message:'not authorize the user , you can not edit this post '});
                                   }else {

                                       res.json({success:true , blog:blog});
                                   }
                               }
                           }
                       });

                   }
               }

           });
       }

    });

    router.put('/updateBlogPost', (req , res )=>{

        if(!req.body._id){
            res.json({success:false , message:'No id provided'});
        }else {
          //  res.send(req.body._id);
            Blog.findOne({_id : req.body._id } , (err , blog)=>{
                if(err){
                    res.json({success:false , message:'ID not found '})
                }else {
                    if(!blog){
                        res.json({success:false , message:'blog not found'});
                    }else {

                        User.findOne({_id : req.decoded.userID} , (err, user)=>{
                      //  console.log('13');

                        if(err){
                        //    res.send('2');
                            res.json({success:false , message:"invalid tokens-> from update blog post"});
                        }else {
                         //   res.send('3');
                            if(!user){
                                res.json({success:false , message:"user not found"});
                            }else {
                             //   res.send('4');
                                if(user.username !== blog.createdBy){
                                    res.json({success:false , message:'not authorize the user , you can not update this post '});
                                }else {

                                    // const blog =  {
                                    //
                                    //     title:req.body.title,
                                    //     body:req.body.body
                                    // }
                                    //getting err because we need only title and body not whole object
                                    blog.title = req.body.title;
                                    blog.body = req.body.body;



                                    //res.send(blog);


                                    blog.save((err)=>{
                                        if(err){
                                       //     res.send('6');
                                            res.json({success:false , message:"err fired from update single blog post"+err});
                                        }else {
                                       //     res.send('7');
                                            res.json({success:true , message:"Blog Updated"});
                                        }
                                    });

                                }
                            }
                        }
                     });



                    }
                }

            });


        }

    });

    router.delete('/deleteBlogPost/:id' , (req,res)=>{
        if(!req.params.id){
             res.json({success:false , message:"NO id was provide"});
           // res.send('1'+req.params.id);
        }else {
            Blog.findOne({_id: req.params.id} ,(err , blog)=>{
               if(err){
                   res.json({success:false , message :'Delete krne k liye jo id de wo galat hai :'+err})
               }else {
                   if(!blog){
                       res.json({success:false , message:'Blog not found'});
                   }else {

                   // //    res.send(blog);
                   //     User.findOne({_id:req.decoded.userID} , (err, user) => {
                   //        // res.send(user);
                   //         if (err){
                   //            res.json({success:false , message:err});
                   //        }else {
                   //            if(!user){
                   //                res.json({success:false , message:'User not found!'});
                   //            }else {
                   //                if(blog.createdBy !== user.username){
                   //                    res.json({success:false , message:'You are not authorize to delete this post'});
                   //                }else{
                   //                    blog.remove((err)=>{
                   //                        if(err){
                   //                            res.json({success:false , message:err});
                   //                        }else {
                   //                            res.json({success:true , message:"Blog Deleted!"});
                   //                        }
                   //                    })
                   //                }
                   //            }
                   //        }
                   //
                   //     });




                       User.findOne({_id : req.decoded.userID} , (err, user)=>{
                           //  console.log('13');

                           if(err){
                               //    res.send('2');
                               res.json({success:false , message:"invalid tokens-> from update blog post"});
                           }else {
                               //   res.send('3');
                               if(!user){
                                   res.json({success:false , message:"user not found"});
                               }else {
                                   //   res.send('4');
                                   if(user.username !== blog.createdBy){
                                       res.json({success:false , message:'not authorize the user , you can not update this post '});
                                   }else {

                                       blog.remove((err)=>{
                                           if(err){
                                               res.json({success:false , message:err});
                                           }else {
                                               res.json({success:true , message:"Blog Deleted!"});
                                           }
                                       });

                                   }
                               }
                           }
                       });


                   }
               }

            });
        }

     });

    router.put('/likeBlogPost' ,(req,res)=>{
       if(!req.body.id){
           res.json({success:false , message:'id was not provided!'});
       }else {
           Blog.findOne({_id : req.body.id},(err , blog)=>{
              if(err){
                  res.json({success:false, message:'err in like post '+err});
              } else {
                  if(!blog){
                      res.json({success:false , message:'Blog not found!'});
                  }else {
                      User.findOne({_id : req.decoded.userID} , (err, user)=>{
                         if(err){
                             res.json({success:false , message:'err in link ' +err});
                         } else {
                             if(!user){
                                 res.json({success:false , message:'User not found'});
                             }else {
                                 if(user.username === blog.createdBy){
                                     res.json({success:false , message:'You can not like your own post'});
                                 }else {
                                     if(blog.likeBy.includes(user.username)){ //check  username exist in likedBy array
                                         res.json({success:false , message :'You already liked this post'});
                                     }else {//Check user already liked this post
                                         if(blog.dislikeBy.includes(user.username)){ //check username exist in dislikedBy array
                                             blog.dislikes --; //dec 1
                                             const arrayIndex = blog.dislikeBy.indexOf(user.username); //find index
                                             blog.dislikeBy.splice(arrayIndex ,1); //remove 1 from that index
                                             blog.likes++; //Now increment
                                             blog.likeBy.push(user.username); //finally push
                                             blog.save((err)=>{
                                                 if(err){
                                                     res.json({success:false , message:'like save nhe '+err});
                                                 }else {
                                                     res.json({success:true , message:'blog liked!'});
                                                 }
                                             });
                                         }else { // Check the user did not touch dislike button before
                                             blog.likes++;
                                             blog.likeBy.push(user.username);
                                             blog.save((err)=>{
                                                 if(err){
                                                     res.json({success:false , message:'like save nhe '+err});
                                                 }else {
                                                     res.json({success:true , message:'blog liked!'});
                                                 }
                                             });
                                         }
                                     }
                                 }
                             }
                         }
                      });
                  }
              }
           });
       }

    });

    router.put('/dislikeBlogPost' ,(req,res)=>{
        if(!req.body.id){
            res.json({success:false , message:'id was not provided!'});
        }else {
            Blog.findOne({_id : req.body.id},(err , blog)=>{
                if(err){
                    res.json({success:false, message:'err in like post '+err});
                } else {
                    if(!blog){
                        res.json({success:false , message:'Blog not found!'});
                    }else {
                        User.findOne({_id : req.decoded.userID} , (err, user)=>{
                            if(err){
                                res.json({success:false , message:'err in link ' +err});
                            } else {
                                if(!user){
                                    res.json({success:false , message:'User not found'});
                                }else {
                                    if(user.username === blog.createdBy){
                                        res.json({success:false , message:'You can not dislike your own post'});
                                    }else {
                                        if(blog.dislikeBy.includes(user.username)){ //check  username exist in dislikedBy array
                                            res.json({success:false , message :'You already disliked this post'});
                                        }else {//Check user already disliked this post
                                            if(blog.likeBy.includes(user.username)){ //check username exist in likedBy array
                                                blog.likes --; //dec 1
                                                const arrayIndex = blog.likeBy.indexOf(user.username); //find index
                                                blog.likeBy.splice(arrayIndex ,1); //remove 1 from that index
                                                blog.dislikes++; //Now increment
                                                blog.dislikeBy.push(user.username); //finally push
                                                blog.save((err)=>{
                                                    if(err){
                                                        res.json({success:false , message:'dislike save nhe '+err});
                                                    }else {
                                                        res.json({success:true , message:'blog disliked!'});
                                                    }
                                                });
                                            }else { // Check the user did not touch like button before
                                                blog.dislikes++;
                                                blog.dislikeBy.push(user.username);
                                                blog.save((err)=>{
                                                    if(err){
                                                        res.json({success:false , message:'dislike save nhe '+err});
                                                    }else {
                                                        res.json({success:true , message:'blog disliked!'});
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }

    });

    router.post('/comments' ,(req,res)=>{
       if(!req.body.comment){
           res.json({success:false , message:'No comment found'});
       }else {
           if(!req.body.id){
               res.json({success:false , message:'No Id provided'});
           }else {
               Blog.findOne({_id : req.body.id} , (err, blog)=>{
                  if(err){
                      res.json({success:false ,message:'err from comment :'+err})
                  } else {
                      if(!blog){
                          res.json({success:false , message:'Blog not found'});
                      }else {
                          User.findOne({_id : 'userID'} , (err, user)=>{
                            if(err){
                                res.json({success:false ,message:'comment error hai '+err});
                            } else {
                                if(!user){
                                    res.json({success:false , message:'user not found!'});
                                }else {
                                    blog.comments.push({
                                        comment: req.body.comment,
                                        commentator:user.username
                                    });
                                     blog.save((err)=>{
                                         if(err){
                                             if(err.errors){
                                                 if (err.errors.comment){
                                                     res.json({success:false , message:err.errors.comment.message})
                                                 }
                                             }
                                         }
                                         else {
                                             res.json({success:true , message:'comment saved!'});
                                         }
                                     })

                                }
                            }
                         });
                      }
                  }
               });
           }
       }

    });



    return router;
}
