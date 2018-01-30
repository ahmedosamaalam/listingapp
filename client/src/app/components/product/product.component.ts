import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormGroup ,FormBuilder ,FormControl ,Validators } from "@angular/forms";
import { CategoryService} from "../../services/category.service";
import { ProductService } from "../../services/product.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  message;
  messageClass;
  form;
  categories;
  processing = false;
  newProduct = false;
  createdBy;
  products;

  constructor(private location:Location,
              private _fb:FormBuilder,
              private _categoryService:CategoryService,
              private _productService:ProductService,
              private _authService:AuthService


  ) {
    this.createForm()
  }

  createForm(){
    this.form = this._fb.group({
      name:['',Validators.compose([
        Validators.required
      ])],
      description:['',Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(256)
      ])],
      price:['',Validators.compose([
        Validators.required
      ])],
      manufacture:['',Validators.compose([
        Validators.required
      ])],
      category:['',Validators.compose([
        Validators.required
      ])],
      phone:['',Validators.compose([
        Validators.required
      ])],
      // inputFile:['',Validators.compose([
      //   Validators.required
      // ])],

    });
  }




  addProductFormSubmit(){
  //  console.log(this.form);

    const product = {
      name:this.form.get('name').value,
      description:this.form.get('description').value,
      price:this.form.get('price').value,
      phone:this.form.get('phone').value,
      manufacture:this.form.get('manufacture').value,
      category:this.form.get('category').value,
      createdBy:this.createdBy

    }
    this._productService.addProduct(product).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = true;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.AllCategory();
        this.AllProducts()
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
    //  console.log(data);
      this.categories = data.category;
    })
  }


  AllProducts(){
    this._productService.getAllProduct().subscribe(data=>{
     // console.log(data);
      this.products = data.product;
    });
  }


  deleteProduct(id){
    this._productService.deleteProduct(id).subscribe(data=>{

      this.AllProducts();
    })
  }




  goBack(){
    this.location.back();
  }



  ngOnInit() {
    this.AllCategory();
    this.AllProducts();
    this._authService.getProfile().subscribe(profile=>{
      this.createdBy = profile.user.username;
    });

  }

}
