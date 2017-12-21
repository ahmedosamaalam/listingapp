import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from "@angular/router";
import { ProductService } from "../../../services/product.service";
import { CategoryService } from "../../../services/category.service";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  message;
  messageClass;
  currentUrl;
  categories;



  product ={
    name:String,
    description:String,
    price:Number,
    phone:Number,
    manufacture:String,
    category:String,

  }


  constructor( private _activatedRoute:ActivatedRoute,
               private _productService:ProductService,
               private  _router:Router,
               private _categoryService:CategoryService

  ) { }


  AllCategory(){
    this._categoryService.getAllCategory().subscribe(data=>{
      //  console.log(data);
      this.categories = data.category;
    })
  }

  updateCategory(){


    this._productService.updateProduct(this.product).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;

      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this._router.navigate(['/product']);

      }

    });


  }





  ngOnInit() {

    this.AllCategory();

    this.currentUrl = this._activatedRoute.snapshot.params;
    this._productService.editProduct(this.currentUrl.id).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {

        this.product = data.product;


      }
    })

  }

}
