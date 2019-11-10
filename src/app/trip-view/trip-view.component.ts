import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit {

  loading = true;
  trip: any = {};
  tripId: string;
  error: string;
  topOrigins: any = []; 

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.tripId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/trips/' + this.tripId)
      .subscribe(
        (data:any)  => {
          this.trip = data.trip;
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
