import { Injectable } from '@angular/core';
import { Http ,RequestOptions , Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthService} from "./auth.service";


@Injectable()
export class PublicService {

  domain = '';

  constructor(private _http:Http,
              private _authService : AuthService
  ) { }


  getAllProduct(id){

    return this._http.get(this.domain+'/publicRoutes/allProducts/'+id).map(res=>res.json());
  }

  getAllService(id){

    return this._http.get(this.domain+'/publicRoutes/allService/'+id).map(res=>res.json());
  }

  getProducts(){

    return this._http.get(this.domain+'/publicRoutes/Products').map(res=>res.json());
  }

  getServices(){

    return this._http.get(this.domain+'/publicRoutes/Service').map(res=>res.json());
  }

  product(id){

    return this._http.get(this.domain+'/publicRoutes/product/'+id).map(res=>res.json());
  }

  service(id){

    return this._http.get(this.domain+'/publicRoutes/service/'+id).map(res=>res.json());
  }

  sp(sbobj){
    return this._http.post(this.domain+'/publicRoutes/sp',sbobj).map(res=>res.json());
  }

  ss(ssobj){
    return this._http.post(this.domain+'/publicRoutes/ss',ssobj).map(res=>res.json());
  }

  rateProduct(obj){
    return this._http.put(this.domain+'/publicRoutes/rateProduct',obj).map(res=>res.json());
  }

  rateService(obj){
    return this._http.put(this.domain+'/publicRoutes/rateService',obj).map(res=>res.json());
  }

  getRateProduct(id){
    return this._http.get(this.domain+'/publicRoutes/getRateProduct/'+id).map(res=>res.json());
  }



}
