import { Injectable } from '@angular/core';
import { Http ,RequestOptions , Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthService} from "./auth.service";

@Injectable()
export class CategoryService {

  domain = 'http://localhost:1212'

  constructor(private _http:Http,
              private _authService : AuthService
  ) { }

  addCategory(category){
    this._authService.createAuthenticationHeaders();
     return this._http.post(this.domain+'/category/addCategory',category, this._authService.options).map(res=>res.json());
  }

  getAllCategory(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/category/allCategory', this._authService.options).map(res=>res.json());
  }

  editCategory(id){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/category/edit-category/'+id , this._authService.options).map(res=>res.json());
  }

  updateCategory(id){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.domain+'/category/updateCategory',id ,this._authService.options).map(res=>res.json());
  }

  deleteCategory(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/category/deleteCategory/'+id , this._authService.options).map(res=>res.json());
  }

  publicCat(){

    return this._http.get(this.domain+'/category/allCategory', ).map(res=>res.json());
  }

}
