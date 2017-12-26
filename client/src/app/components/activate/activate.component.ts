import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  currentUrl;
  messageClass;
  message;
  data;

  constructor(private _authservice:AuthService ,
              private _activatedRouter:ActivatedRoute
              ) { }





  ngOnInit() {
    this.currentUrl = this._activatedRouter.snapshot.params;
    console.log(this.currentUrl.token);

    this._authservice.activate(this.currentUrl.token).subscribe(data=>{


      console.log(data);

      // if(!data.success){
      //   this.messageClass = 'alert alert-danger';
      //   console.log(data.message.message);
      //   this.message = data.message;
      //
      //
      // }else {
      //   this.data = data; // data object return from database
      //   // this.loading = true;
      // }

    });


  }

}
