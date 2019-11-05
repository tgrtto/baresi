import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
  upcomingTrips: any = [];

  constructor(private http: HttpClient, private contextService: ContextService, private router: Router) {
    this.http.get(environment.api_url+ '/home')
      .subscribe(
        (data:any)  => {
          this.upcomingTrips = data.upcoming_trips;

          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
