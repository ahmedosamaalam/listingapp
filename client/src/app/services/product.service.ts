import { Injectable } from '@angular/core';
import { Http ,RequestOptions , Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { AuthService} from "./auth.service";

@Injectable()
export class ProductService {

  domain = 'https://pacific-reef-33472.herokuapp.com';

  constructor(private _authService:AuthService,
              private _http:Http
  ) { }

  addProduct(product){
    this._authService.createAuthenticationHeaders();
    return this._http.post(this.domain+'/product/addProduct',product, this._authService.options).map(res=>res.json());
  }

  getAllProduct(){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/product/allProducts', this._authService.options).map(res=>res.json());
  }

  editProduct(id){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain+'/product/edit-product/'+id , this._authService.options).map(res=>res.json());
  }


  updateProduct(id){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.domain+'/product/updateProduct',id ,this._authService.options).map(res=>res.json());
  }

  deleteProduct(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/product/deleteProduct/'+id , this._authService.options).map(res=>res.json());
  }


}
