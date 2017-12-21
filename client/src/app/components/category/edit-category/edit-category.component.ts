import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from "@angular/router";
import { CategoryService} from "../../../services/category.service";


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {


  message;
  messageClass;
  currentUrl;


  category ={
    name:String
  }


  constructor( private _activatedRoute:ActivatedRoute,
               private _categoryService:CategoryService,
               private  _router:Router

  ) { }


  updateCategory(){


    this._categoryService.updateCategory(this.category).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;

      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this._router.navigate(['/category']);

      }

    });
  }


  ngOnInit() {

   this.currentUrl = this._activatedRoute.snapshot.params;
  this._categoryService.editCategory(this.currentUrl.id).subscribe(data=>{
    if(!data.success){
      this.messageClass = 'alert alet-danger';
      this.message = data.message;
    }else {

      this.category = data.category;


    }
  })

  }

}
