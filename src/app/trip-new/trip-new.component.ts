import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-trip-new',
  templateUrl: './trip-new.component.html',
  styleUrls: ['./trip-new.component.css']
})
export class TripNewComponent implements OnInit {

  loading: boolean = false;
  routes: any= [];
  vehicles: any= [];
  phase: number = 0;

  error: string;
  selectedVehicleId: string;
  selectedRouteId: string;

  daysOfTheWeek = [{
    name: 'Sunday',
    index: 0,
    value: false
  },
  {
    name: 'Monday',
    index: 1,
    value: false
  },
  {
    name: 'Tuesday',
    index: 2,
    value: false
  },
  {
    name: 'Wednesday',
    index: 3,
    value: false
  },
  {
    name: 'Thursday',
    index: 4,
    value: false
  },
  {
    name: 'Friday',
    index: 5,
    value: false
  },
  {
    name: 'Saturday',
    index: 6,
    value: false
  }]

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.http.get(environment.api_url+ '/routes')
      .subscribe(
        (data:any)  => {
          this.routes = data.routes;
          console.log(this.routes);
        },
      error  => {
        console.log("Error", error);
      });

    this.http.get(environment.api_url+ '/vehicles')
      .subscribe(
        (data:any)  => {
          this.vehicles = data.vehicles;
        },
      error  => {
        console.log("Error", error);
      });
  }

  selectDay(d) {
    let day = this.daysOfTheWeek.find((x) => {
      return x.index == d.index
    })

    if(day != null) {
      day['value'] = !d.value
    }
  }

  nextPhase() {
    this.phase++;
  }

  prevPhase() {
    this.phase--;
  }

  save() {
    this.http.post(environment.api_url + "/trips",
      {
        vehicle_id: this.selectedVehicleId,
        route_id: this.selectedRouteId,
        days_of_the_week: this.daysOfTheWeek.filter((x) => { return x.value }).map((x) => { return x.index}),
      })
      .subscribe(
        (data:any)  => {
          this.router.navigate(['/console/trips']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }

  ngOnInit() {
  }

}
