import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.auth.isAuthenticated()){
      console.log('I am redirecting to login');
      this.router.navigate(['homepage/home']);
      return false;
    } 
    return true;
  }

}
