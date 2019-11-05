import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-insights-cities',
  templateUrl: './insights-cities.component.html',
  styleUrls: ['./insights-cities.component.css']
})
export class InsightsCitiesComponent implements OnInit {

  loading = true;
  routes = [];
  topOrigins: any = [];
  topDestinations: any = [];
  topCombinations: any = [];

  constructor(private http: HttpClient, private contextService: ContextService, private router: Router) {
    this.http.get(environment.api_url+ '/insights/cities')
      .subscribe(
        (data:any)  => {
          this.topOrigins = data.top_origins;
          this.topDestinations = data.top_destinations;
          this.topCombinations = data.top_combinations;
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
