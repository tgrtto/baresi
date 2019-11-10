import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service';
import { TripService } from '../services/trip.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {

  tripId: number;
  trip: any = {};
  vehicles: any= [];
  companies: any = [];
  phase: number = 0;

  selectedVehicleId: number;

  error: string;
  loading: boolean = true;

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

  constructor(private http: HttpClient,
  private activatedRoute: ActivatedRoute,
  private contextService: ContextService,
  private tripService: TripService,
  private vehicleService: VehicleService,
  private router: Router) {
    this.tripId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.trip = await this.tripService.findById(this.tripId);
      //if user is admin
      if(true) {
        this.vehicles = await this.vehicleService.findByCompanyId(this.trip['company_id'])
      } else {
        //if user is not admin
        // this.routes = await this.routeService.findAll()
      }

      let d, w, m;
      for(let day of this.trip['days_of_the_week']) {
        d = this.daysOfTheWeek.find((x) => {
          return x.index == day
        })

        if(d != null) {
          d['value'] = true;
        }
      }

    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

  async nextPhase() {
    try {
      this.error = null;

      if(this.phase === 0) {
        if(this.selectedVehicleId == null) {
          throw "You need to select a vehicle"
        }
      }

      this.phase++;
    } catch(e) {
      this.error = e.toString();
    }
  }

  async prevPhase() {
    this.phase--;
  }

  selectDay(d) {
    let day = this.daysOfTheWeek.find((x) => {
      return x.index == d.index
    })

    if(day != null) {
      day['value'] = !d.value
    }
  }

  save() {
    this.loading = true;
    this.http.put(environment.api_url + "/trips/" + this.tripId,
      {
        vehicle_id: this.selectedVehicleId,
        days_of_the_week: this.daysOfTheWeek.filter((x) => { return x.value }).map((x) => { return x.index})
      })
      .subscribe(
        (data:any)  => {
          this.loading = false;
          this.router.navigate(['/console/trips']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }
}
