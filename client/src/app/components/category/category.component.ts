import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup , FormControl , FormBuilder ,Validators} from "@angular/forms";
import { CategoryService} from "../../services/category.service";
import { AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  message;
  messageClass;
  productTab=false;
  serviceTab=false;
  userTab=false;
  categoryTab=false;
  processing=false;
  newCategory=false;
  form;
  categories;
  products;
  services;
  users;
  statusClass;
  statusMessage;
  status;
  user;
  x;

  constructor(
              private _location:Location,
              private _fb:FormBuilder,
              private _categoryService:CategoryService,
              private _adminService:AdminService
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

  getAllUsers(){
    this._adminService.getAllUsers().subscribe(data=>{
        this.users = data.user;
    });
  }


  blockUser(id){
    this.user = {
      id:id,
      status:false
    }

    this._adminService.updateUsers(this.user).subscribe(data=>{

      this.getAllUsers();
    });
  }


  unBlockUser(id){
    this.user = {
      id:id,
      status:true
    }
    console.log(this.user);
    this._adminService.updateUsers(this.user).subscribe(data=>{

      this.getAllUsers();
    });

  }




  deleteUser(id){
    this._adminService.deleteUsers(id).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllUsers();
      }
    });
  }




  getAllProducts(){
    this._adminService.getAllProduct().subscribe(data=>{
        this.products =data.product;
    });
  }

  deleteProduct(id){
    this._adminService.deleteProducts(id).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllProducts();

      }

    });
  }



  getAllServices(){
    this._adminService.getAllServices().subscribe(data=>{
        this.services = data.service
    });
  }
  deleteService(id){
    this._adminService.deleteServices(id).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;

      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllServices();

      }

    });
  }


  refresh(){
   // console.log('refresh');
    this.AllCategory();
  }

  goBack(){
    this.newCategory = false;

    //this._location.back();
  }
  hideProducts(){
    this.productTab = false;
  }
  hideServices(){
    this.serviceTab = false;
  }
  hideUsers(){
    this.userTab = false;
  }
  hideCategories(){
    this.categoryTab = false;
  }



  showCategories(){
    this.categoryTab = true;
  }
  showUsers(){
    this.userTab = true;
  }
  showServices(){
    this.serviceTab = true;
  }
  showProducts(){
    this.productTab = true;

  }



  ngOnInit() {
    this.AllCategory();
    this.getAllUsers();
    this.getAllServices();
    this.getAllProducts()
  }

}
