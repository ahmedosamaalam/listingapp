import { Injectable } from '@angular/core';

import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot,} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  redirectUrl;
  datas;
  currentUserRole;

  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(router:ActivatedRouteSnapshot , state:RouterStateSnapshot) {
    if(this._auth.loggedIn()) {


      let roles = router.data["roles"] ;


     // console.log(roles);



        this.datas =  this._auth.roleCheck().subscribe(data=>{

          // console.log(data);
            this.currentUserRole = data.role;
        });



     // if(roles===this.currentUserRole || roles !== 'admin'){
        if(roles){
          if(roles===this.currentUserRole ){
            return true
          }else {
            return false;
          }

        }else {
          return true;
        }



      // if(roles){
      //   if( roles !== 'admin') {
      //     if(roles !==  this.currentUserRole ){
      //       return false;
      //     }
      //   }
      // }else {
      //   return true;
      // }



      // // if(!roles) {
      //   if(roles[0] !==  this.currentUserRole  &&  roles[0] !===  ){
      //     return false;
      //   }else {
      //     return true;
      //   }
      // }
      // else {
      //   return true;
      // }







    } else {
      this.redirectUrl = state.url; // hold url that user typed
      this._router.navigate(['/login']);
      return false;
    }
  }
}
