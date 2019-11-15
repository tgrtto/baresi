import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private activatedRoute:ActivatedRoute, private router: Router) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('gopamoja_user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email, password) {
    this.http.post(environment.auth_url + "/login", {email:email, password: password})
    .subscribe(
      (data:any)  => {
        localStorage.setItem('gopamoja_user', JSON.stringify(data.user))
        this.router.navigate(['/console/ticket_requests']);
        this.currentUserSubject.next({user:data.user});
      },
      error  => {
        console.log(error);
    });
  }

  logout() {
    let self = this;
    this.http.get(environment.auth_url + '/logout')
      .subscribe(
        (data:any)  => {
          localStorage.removeItem('gopamoja_user');
          // this.router.navigate(['/login'], { queryParams: { returnUrl: '/algorithms' }});
          self.currentUserSubject.next(null);
          self.router.navigate(['/login']);
        },
      error  => {
        console.log("Error", error);
      });
    // remove user from local storage and set current user to null
  }
}
