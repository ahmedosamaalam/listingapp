import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { PublicService } from "../../../../services/public.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class PServiceComponent implements OnInit {

  service;
  currentUrl

  starRating = 3;
  vRating = 1;
  faoRating ;
  movieRating = 2;
  obj;
  totalhits;


  constructor(private  _publicService:PublicService,
              private _activatedRoute:ActivatedRoute)
  { }


  services(id){
    this._publicService.service(id).subscribe(data=>{
      this.service = data.service;
    })
  }



  rateService(){

    this.obj ={
      _id:this.currentUrl.id,
      rate:this.faoRating
    }

    this._publicService.rateService(this.obj).subscribe(data=>{
      //console.log(data);
      this.totalhits = data.service.rating;
      console.log(this.totalhits.length);
    })
  }




  onFaoRate(event){
    this.faoRating  = event;
    //  console.log(this.faoRating);
    this.rateService();


  }






  ngOnInit() {

    this.currentUrl = this._activatedRoute.snapshot.params;
    this.services(this.currentUrl.id);


  }

}
