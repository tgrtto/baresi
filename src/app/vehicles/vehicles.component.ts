import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  loading = true;
  vehicles = [];

  constructor(private http: HttpClient, private contextService: ContextService, private router: Router) {
    this.http.get(environment.api_url+ '/vehicles')
      .subscribe(
        (data:any)  => {
          console.log(data);
          this.vehicles = data.vehicles;
          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  ngOnInit() {
  }

}
