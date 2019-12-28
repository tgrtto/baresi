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

  selectedVehicleId: number;

  error: string;
  loading: boolean = true;

  hiddenAnswers = [{
      title: 'Yes',
      value: 'true'
    },
    {
      title: 'No',
      value: 'false'
  }];

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

      for(let v of this.vehicles) {
        if(isNaN(v['id'])) {
          throw "Vehicle id is not a number"
        }

        v['id'] = v['id'].toString();
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

      if(typeof this.trip['hidden'] !== 'boolean') {
        throw "Invalid hidden type"
      }

      this.trip['hidden'] = this.trip['hidden'].toString();

      if(isNaN(this.trip['vehicle_id'])) {
        throw "Invalid vehicle id"
      }

      this.trip['vehicle_id'] = this.trip['vehicle_id'].toString();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
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
    try {
      this.loading = true;
      this.error = null;

      if(typeof this.trip['hidden'] !== 'string') {
        throw "Please check whether it should be hidden or not."
      }

      const hidden = (this.trip['hidden'] === 'true');

      if(isNaN(this.trip['vehicle_id'])) {
        throw "Please check a vehicle id."
      }

      const vehicleId = parseInt(this.trip['vehicle_id']);

      this.http.put(environment.api_url + "/trips/" + this.tripId,
        {
          vehicle_id: vehicleId,
          days_of_the_week: this.daysOfTheWeek.filter((x) => { return x.value }).map((x) => { return x.index}),
          hidden: hidden
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

    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
