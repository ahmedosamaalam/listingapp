import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,FormControl , Validators} from "@angular/forms";
import { CustomValidator} from  '../../validators/validator'
import { AuthService } from "../../services/auth.service";
import { BlogService} from "../../services/blog.service";
import { Location } from "@angular/common";



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  username; // hold who is creator the post

  messageClass;
  message;
  newPost = false;
  loadingsBlogs = false;
  processing = false;
  form:FormGroup;
  allBlogPosts;
  p: number = 1;

  constructor(
    private _fb:FormBuilder,
    private _authService:AuthService,
    private _blogService:BlogService,
    private _location:Location,



  ) {

    this.createBlogForm();

  }

  enabledBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }
  disabledBlogForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  //create Blog Form for new Blog post
  createBlogForm(){
   this.form = this._fb.group({
      title:['' , Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
        CustomValidator.alphanumericChecker,

      ])] ,
     body:['',Validators.compose([
       Validators.required,
       Validators.minLength(5),
       Validators.maxLength(500)
     ])]

    });

  }

  addBlogFormSubmit(){
   // this.processing = true;
  //  this.newPost = false;
  //  this.disabledBlogForm();


    const blog = {
      title:this.form.get('title').value,
      body:this.form.get('body').value,
      createdBy:this.username
    };

    this._blogService.addBlog(blog).subscribe(data=>{

      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.enabledBlogForm();
        this.processing = true;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllBlogPosts();
        //clear all the data after 2 second
        setTimeout(()=>{
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enabledBlogForm();

        },2000);


      }



    })


  }



  //Blog page -> new post || new blog form
  newBlogForm(){
    this.newPost = true;
    this.form.reset();
    this.processing = false;
    this.enabledBlogForm();

  }

  //reload all the blog posts
  reloadBlogs(){
    this.loadingsBlogs = true;
    this.getAllBlogPosts();
    //Get all Blog Posts
  setTimeout(()=>{
    this.loadingsBlogs = false;
    this.getAllBlogPosts();
  } , 4000);

  }

  // blog comment
  draftComment(){
    console.log('draft comment');
  }


  // go back function in add new blog post
  goBack(){
   // this.processing = true;
    this._location.back(); //angular method
  //  window.location.reload(); using javascript

  }
  //get all the post and subscribe
  getAllBlogPosts(){
    this._blogService.getAllPosts().subscribe(data=>{
    this.allBlogPosts = data.blogs;
    });
  }

  likeBlogs(id){
    this._blogService.likeBlog(id).subscribe(data=>{
      this.getAllBlogPosts();
    });
  }

  dislikeBlogs(id){
    this._blogService.dislikeBlog(id).subscribe(data=>{
      this.getAllBlogPosts();
    });
  }


  ngOnInit() {
    this._authService.getProfile().subscribe(profile=>{
      this.username = profile.user.username;
    });
    this.getAllBlogPosts();
  }

}
