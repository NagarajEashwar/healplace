import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken()) {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      const isGroup = userData?.groups[0];
      const userName = userData?.user.username;
      const email = userData?.user.email;
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${this.auth.getToken()}`)
        .set('auth', this.auth.getToken())
        .set('username', userName)
        .set('group', isGroup)
        .set('email', email)
      });
    }

    // return next.handle(request);
    return next.handle(request).pipe(tap(() => {},(err: any) => {
      if(err instanceof HttpErrorResponse){
        if(err.status == 403){
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_data");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("logedin_data");
          window.location.reload();
        } 
      }
    }));
  }
}