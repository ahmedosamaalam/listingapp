import { Injectable } from '@angular/core';
import { Http ,RequestOptions , Headers } from "@angular/http";
import  'rxjs/add/operator/map';
import { AuthService} from "./auth.service";

@Injectable()
export class BlogService {


  domain = this._authService.domain;

//  domain = 'http://localhost:1212/'; backslsh in last
  constructor(
    private _http:Http,
    private _authService : AuthService

  ) { }


  addBlog(blog){
    this._authService.createAuthenticationHeaders();
    return  this._http.post(this.domain +'/blog/newBlog' , blog , this._authService.options).map(res=>res.json());
  }

  getAllPosts()  {
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain + '/blog/getAllPosts' , this._authService.options).map(res =>res.json());
  }

  getSingleBlogPost(id){
    this._authService.createAuthenticationHeaders();
    return this._http.get(this.domain + '/blog/singlePost/'+id ,this._authService.options ).map(res=>res.json());
  }

  updateBlogPost(blog){
    this._authService.createAuthenticationHeaders();
    return this._http.put(this.domain + '/blog/updateBlogPost' , blog , this._authService.options).map(res=>res.json());
  }


  deleteBlogPost(id){
    this._authService.createAuthenticationHeaders();
    return this._http.delete(this.domain+'/blog/deleteBlogPost/'+id , this._authService.options).map(res =>res.json());
  }

  likeBlog(id){
    this._authService.createAuthenticationHeaders();
    const blogData  = {id :id };
    return this._http.put(this.domain + '/blog/likeBlogPost' , blogData ,this._authService.options ).map(res=>res.json());
  }

  dislikeBlog(id){
    const blogData  = {id :id };
    return this._http.put(this.domain + '/blog/dislikeBlogPost' , blogData ,this._authService.options ).map(res=>res.json());
  }

}
