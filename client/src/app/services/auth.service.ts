import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = '';
  authTokenl;
  user;
  headers;
  options;

 // FB:any;

  constructor(private  _http : Http) {

    // this.FB.init({
    //   appId      : '635788116591482',
    //   status     : false, // the SDK will attempt to get info about the current user immediately after init
    //   cookie     : false,  // enable cookies to allow the server to access
    //   // the session
    //   xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
    //   version    : 'v2.8' // use graph api version 2.5
    // });

  }

  createAuthenticationHeaders(){

    //Call back function
    this.loadToken();

    //create header for send bit meta-data with http request to the server
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('authorization' , this.authTokenl);

    //create object RequestOptions  and pass header
     this.options = new RequestOptions({headers:this.headers});

      // this.options = new RequestOptions({
      //   headers: new  Headers({
      //     'Content-Type': 'application/json',
      //     'authorization' : this.authTokenl
      //   })
      // });

  }
  //load token of current user logged-in from localstorage
  loadToken(){
    this.authTokenl = localStorage.getItem('token');
  }

  //communicate with  api and map
  registerUsers(user){
    return this._http.post(this.domain + '/authentication/register' , user )
               .map(res =>res.json() );
  }

  // //activate account
  // activateAccount(token){
  //   const token = { token:token};
  //   this.createAuthenticationHeaders();
  //   return this._http.put(this.domain+'/authentication/activate/'+token,this.options ).map(res =>res.json())
  // }



  //check username, current username already taken or not
  checkUsername(username){
    return this._http.get(this.domain + 'authentication/checkUsername/'+username )
      .map(res =>res.json() );
  }

  //check email id, current email already taken or not
  checkEmail(email){
    return this._http.get(this.domain + 'authentication/checkEmail/'+email )
      .map(res =>res.json() );
  }

  //communicate with login api and map
  loginUser(user){
    return this._http.post(this.domain + '/authentication/login', user )
               .map(res=>res.json());
  }

  logoutUser(){
    this.authTokenl = null;
    this.user = null;
    localStorage.clear();
  }

  //stored data(token and username) in local storage
  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authTokenl = token;
    this.user = user;
  }
//getting current profile info
  getProfile(){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain + '/authentication/profile' , this.options)
               .map(res=>res.json() );
  }

 //angular2 jwt, check the user login
  loggedIn() {
    return tokenNotExpired();
  }

  roleCheck(){
    this.createAuthenticationHeaders();
    return this._http.get(this.domain+'/authentication/role' ,this.options).map(res=>res.json());
  }


//activate account
  activate(token){
    this.createAuthenticationHeaders();
    return this._http.put(this.domain+'/authentication/activate/'+token ,this.options).map(res=>res.json());
  }



  // fbLogin() {
  //
  //       return this._http.get('http://localhost:1212/authentication/auth/facebook').map(res =>res.json());
  //
  // }



}
