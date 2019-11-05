import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('reached here');
      if(environment && environment.production) {
        const currentUser = this.authenticationService.currentUserValue;
        if(state.url === '/login') {
          if (currentUser) {
            this.router.navigate(['/console/home']);
          }
          return true;

        } else {
          if(currentUser) {
              // authorised so return true
              return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }
      } else {
        return true;
      }
  }

}
