import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup , FormControl , FormBuilder ,Validators} from "@angular/forms";
import { CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  message;
  messageClass;
  processing=false;
  newCategory=false;
  form:FormGroup;
  categories;

  constructor(
              private _location:Location,
              private _fb:FormBuilder,
              private _categoryService:CategoryService
  ) {

  }


  createCategoryForm(){
    this.form =this._fb.group({
      category:['' , Validators.compose([
        Validators.required ,
        Validators.minLength(3),
        Validators.maxLength(120)
      ])]
    })
  }

  addCategory(){
    this.newCategory=true;
    this.createCategoryForm();

  }
  addCategoryFormSubmit(){
      this.newCategory = false;
      //console.log('form submit');
      console.log(this.form);

      const category = {
        name:this.form.get('category').value
      }
      this._categoryService.addCategory(category).subscribe(data=>{
        if(!data.success){
          this.messageClass = 'alert alert-danger';
          this.message = data.message;
          this.processing = true;
        }else {
          this.messageClass = 'alert alert-success';
          this.message = data.message;
          this.AllCategory();
          //clear all the data after 2 second
          setTimeout(()=>{
            this.processing = false;
         //   this.newCategory=false
            this.message = false;
            this.form.reset();

          },2000);


        }
      });

  }

  AllCategory(){
    this._categoryService.getAllCategory().subscribe(data=>{

      this.categories = data.category;
    })
  }


  deleteCategory(id){
      this._categoryService.deleteCategory(id).subscribe(data=>{

        this.AllCategory();
      })
  }


  refresh(){
   // console.log('refresh');
    this.AllCategory();
  }

  goBack(){
    this.newCategory = false;
    //this._location.back();
  }

  ngOnInit() {
    this.AllCategory();
  }

}
