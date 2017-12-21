import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../../../services/service.service";
import {Router , ActivatedRoute} from "@angular/router";
import { CategoryService } from "../../../services/category.service";


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  constructor(private _serviceService:ServiceService,
              private activatedRoute:ActivatedRoute,
              private  _router:Router,
              private _categoryService:CategoryService
  ) { }


 // service;
  currentUrl;
  message;
  messageClass;
  categories;





  service = {
    name: String,
    description: String,
    location: String,
    phone: String,
    category: String,
  }


  AllCategory(){
    this._categoryService.getAllCategory().subscribe(data=>{
      //  console.log(data);
      this.categories = data.category;
    })
  }
  updateService(){



    this._serviceService.updateServicet(this.service).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;

      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this._router.navigate(['/service']);

      }

    });



  }






  ngOnInit() {
    this.AllCategory();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this._serviceService.editService(this.currentUrl.id).subscribe(data=>{
      this.service = data.service;

    });

  }

}
