import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  loading = true;
  routes = [];

  constructor(private http: HttpClient, private contextService: ContextService, private router: Router) {
    this.http.get(environment.api_url+ '/routes')
      .subscribe(
        (data:any)  => {
          this.routes = data.routes;
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
