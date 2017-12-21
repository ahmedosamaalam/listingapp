import { Component, OnInit } from '@angular/core';
import { PublicService} from "../../../services/public.service";
import { Router , ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-public-service',
  templateUrl: './public-service.component.html',
  styleUrls: ['./public-service.component.css']
})
export class PublicServiceComponent implements OnInit {

  currentUrl;
  services;
  query;
  isQuery = false;

  constructor(private  _publicService:PublicService,
              private  _router:Router,
              private  _activatedRoute:ActivatedRoute
  ) { }

  getService(){
    this._publicService.getServices().subscribe(data=>{
      this.services = data.service
    })
  }




  searhService(search){

    console.log(search);

    this.isQuery = true;

    this.query ={
      search:search

    }

    this._publicService.ss(this.query).subscribe(data=>{

      this.services = data.service
    })

  }



  ngOnInit() {
    this.getService();
    this.currentUrl = this._activatedRoute.snapshot.params;
  }

}
