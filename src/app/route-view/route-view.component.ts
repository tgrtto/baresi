import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.css']
})
export class RouteViewComponent implements OnInit {

  loading = true;
  routeId: string;
  route: any = {};
  mode: string = 'stops';

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.routeId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/routes/' + this.routeId)
      .subscribe(
        (data:any)  => {
          this.route = data.route;
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  changeMode(newMode) {
    this.mode = newMode;
  }

  ngOnInit() {
  }

}
