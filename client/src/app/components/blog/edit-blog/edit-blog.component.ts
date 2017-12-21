import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { BlogService } from "../../../services/blog.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  currentUrl;
  loading = true;

  blog ={
    title:String,
    body:String
  };

  constructor(
    private _location:Location,
    private _blogService:BlogService,
    private _activatedRoute: ActivatedRoute,
    private  _router:Router
  ) { }

  //creating the blog object

  //
   updateBlogFormSubmit(){
     console.log('updateBlogFormSubmit done ');
    this.processing = true;

    this._blogService.updateBlogPost(this.blog).subscribe(data=>{
     if(!data.success){
       this.messageClass = 'alert alert-danger';
       this.message = data.message;
       this.processing = false;
     }else {
       this.messageClass = 'alert alert-success';
       this.message = data.message;
       setTimeout(()=>{
         this._router.navigate(['/blog']);
       }, 2000)
     }

    });

   }

   deleteBlogPost(){

     this.processing = true;
     this._blogService.deleteBlogPost(this.currentUrl.id).subscribe(data =>{
       if(!data.success){
         this.messageClass = 'alert alert-danger';
         this.message = data.message;
        // this.processing = false;
       }else{
         this.messageClass = 'alert alert-success';
         this.message = data.message;
         setTimeout(()=>{
           this._router.navigate(['/blog']);
         }, 2000)
       }
     });
   }


  goBack(){
    this._location.back();
  }

  ngOnInit() {

    this.currentUrl = this._activatedRoute.snapshot.params;
    this._blogService.getSingleBlogPost(this.currentUrl.id).subscribe(data=>{


      if(!data.success){
        this.messageClass = 'alert alert-danger';
        console.log(data.message.message);
        this.message = data.message;
        this.loading = false;

      }else {
        this.blog = data.blog; // blog object return from database
       // this.loading = true;
      }
    });

  }

}
