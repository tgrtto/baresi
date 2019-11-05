import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-route-settings',
  templateUrl: './route-settings.component.html',
  styleUrls: ['./route-settings.component.css']
})
export class RouteSettingsComponent implements OnInit {

  loading = true;
  route: any = {};
  routeId: string;
  error: string;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.routeId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/routes/' + this.routeId)
      .subscribe(
        (data:any)  => {
          this.route = data.route;
          console.log(this.route);
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }


  ngOnInit() {
  }

}
