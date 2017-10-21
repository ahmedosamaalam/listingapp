import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from  '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService:AuthService , private _route:Router ,private _flashMessageService:FlashMessagesService ) {}

  onLogout(){
   this._authService.logoutUser();
   this._flashMessageService.show("You are logged out" , {cssClass:' alert-info'});
   this._route.navigate(['/']);

  }



  ngOnInit() {
  }

}
