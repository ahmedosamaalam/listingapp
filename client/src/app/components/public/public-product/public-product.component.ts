import { Component, OnInit } from '@angular/core';
import { PublicService} from "../../../services/public.service";
import { Router , ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-public-product',
  templateUrl: './public-product.component.html',
  styleUrls: ['./public-product.component.css']
})
export class PublicProductComponent implements OnInit {

  currentUrl;
  products;
  services;
  query;
  isQuery = false;


  constructor(private  _publicService:PublicService,
              private  _router:Router,
              private  _activatedRoute:ActivatedRoute
  ) { }

  getProducts(){
    this._publicService.getProducts().subscribe(data=>{
      this.products = data.product;
    })
  }




  searhProducr(search){

    this.isQuery = true;

    this.query ={
      search:search

    }

    this._publicService.sp(this.query).subscribe(data=>{

      this.products = data.product;
    })

  }


  ngOnInit() {
    this.getProducts();
    this.currentUrl = this._activatedRoute.snapshot.params;

  }

}
