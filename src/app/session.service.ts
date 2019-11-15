import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      req = req.clone({
        withCredentials: true
      });

      return next.handle(req).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event);
          // do stuff with response and headers you want
          // this.authenticationService.logout();
          if(event.status == 401) {
            this.authService.logout();
          }
        }
        return event;
      }))
  }
}
