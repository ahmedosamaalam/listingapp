import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {AuthService} from "./auth.service";
import "rxjs/add/operator/map";

@Injectable()
export class AdminService {

  domain = ''

  constructor(private _http:Http,
              private _authService:AuthService
  ) { }

  getAllUsers(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/admin/users' , this._authService.options).map(res=>res.json());
  }

  updateUsers(user){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.domain+'/admin/updateUser', user, this._authService.options).map(res=>res.json());
  }

  deleteUsers(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/admin/deleteUser/'+id , this._authService.options).map(res=>res.json());
  }


  getAllProduct(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/admin/products' , this._authService.options).map(res=>res.json());
  }
  deleteProducts(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/admin/deleteProduct/'+id , this._authService.options).map(res=>res.json());
  }

  getAllServices(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/admin/services' , this._authService.options).map(res=>res.json());
  }
  deleteServices(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/admin/deleteService/'+id , this._authService.options).map(res=>res.json());
  }




}
