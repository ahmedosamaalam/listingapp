import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";

declare   var $:any;

@Component({
 // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories;

  constructor(private _categoryService:CategoryService) { }


  getAllcategory(){
    this._categoryService.getAllCategory().subscribe(data=>{

      this.categories = data.category;
    })
  }


  ngOnInit() {

    this.getAllcategory();



  }

}
