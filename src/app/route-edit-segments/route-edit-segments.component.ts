import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

function UUID() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

@Component({
  selector: 'app-route-edit-segments',
  templateUrl: './route-edit-segments.component.html',
  styleUrls: ['./route-edit-segments.component.css']
})
export class RouteEditSegmentsComponent implements OnInit {

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

  save() {
    this.loading = true;
    this.http.put(environment.api_url + "/routes/" + this.routeId + "/segments",
      {
        segments: this.route.segments
      })
      .subscribe(
        (data:any)  => {
          this.loading = false;
          console.log(data);
          // this.router.navigate(['/console/routes/' + data.route.id + '/edit']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }

  ngOnInit() {
  }

}
