import { Injectable } from '@angular/core';
import { Http ,RequestOptions , Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthService} from "./auth.service";


@Injectable()
export class ServiceService {

  domain = '';

  constructor(private _http:Http,
              private _authService : AuthService
  ) { }



  addService(service){
    this._authService.createAuthenticationHeaders();
    return this._http.post(this.domain+'/service/addService',service, this._authService.options).map(res=>res.json());
  }

  getAllService(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/service/allService', this._authService.options).map(res=>res.json());
  }

  editService(id){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/service/edit-service/'+id , this._authService.options).map(res=>res.json());
  }


  updateServicet(id){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.domain+'/service/updateService',id ,this._authService.options).map(res=>res.json());
  }

  deleteService(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/service/deleteService/'+id , this._authService.options).map(res=>res.json());
  }





}
