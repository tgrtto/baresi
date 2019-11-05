import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  mode = new Subject<any>();
  machine = new Subject<any>();

  constructor(private http: HttpClient, private activatedRoute:ActivatedRoute, private router: Router) {}

  updateProject(id) {
    this.http.get(environment.api_url + "/machines/" + id)
    .subscribe(
      (data:any)  => {
        this.machine.next(data.machine);
      },
    error  => {
      this.machine.next(error);
    });
  }

  setMode(new_mode) {
    this.mode.next(new_mode);
  }

  getMode(): Observable<any> {
     return this.mode.asObservable();
  }

  getMachine(): Observable<any> {
     return this.machine.asObservable();
  }
}
