import { Injectable } from '@angular/core';

import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot,} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  redirectUrl;

  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(router:ActivatedRouteSnapshot , state:RouterStateSnapshot) {
    if(this._auth.loggedIn()) {
      return true;
    } else {
      this.redirectUrl = state.url; // hold url that user typed
      this._router.navigate(['/login']);
      return false;
    }
  }
}
