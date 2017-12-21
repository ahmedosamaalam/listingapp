import { Component, OnInit } from '@angular/core';
import { PublicService} from "../../../services/public.service";
import { Router , ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  currentUrl;
  products;
  services;
  constructor(private  _privateService:PublicService,
              private  _router:Router,
              private  _activatedRoute:ActivatedRoute
  ) { }


  getAllProduct(id){
    this._privateService.getAllProduct(id).subscribe(data=>{

      this.products = data.product;
    })
  }
  getAllService(id){
    this._privateService.getAllService(id).subscribe(data=>{

      this.services = data.service;
    })
  }



  ngOnInit() {
    this.currentUrl = this._activatedRoute.snapshot.params;
    this.getAllProduct(this.currentUrl.id);
    this.getAllService(this.currentUrl.id);



  }

}
