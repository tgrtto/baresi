import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service';
import { RouteService } from '../services/route.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-trip-new',
  templateUrl: './trip-new.component.html',
  styleUrls: ['./trip-new.component.css']
})
export class TripNewComponent implements OnInit {

  loading: boolean = true;
  routes: any= [];
  vehicles: any= [];
  companies: any = [];
  phase: number = 0;
  error: string;

  selectedVehicleId: number;
  selectedRouteId: number;
  selectedCompanyId: number;

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

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private companyService: CompanyService,
    private routeService: RouteService,
    private vehicleService: VehicleService,
    private router: Router) {
      this.initialise();
  }

  async initialise() {
    try {
      this.companies = await this.companyService.findAll();
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

  async nextPhase() {
    try {
      this.error = null;
      if(this.phase === 0) {
        if(this.selectedCompanyId == null) {
          throw "You need to select a company"
        }

        this.loading = true;
        //if user is admin
        if(true) {
          this.routes = await this.routeService.findByCompanyId(this.selectedCompanyId)
        } else {
          //if user is not admin
          // this.routes = await this.routeService.findAll()
        }

        this.loading = false;
      }

      if(this.phase === 1) {
        if(this.selectedRouteId == null) {
          throw "You need to select a route"
        }

        this.loading = true;
        //if user is admin
        if(true) {
          this.vehicles = await this.vehicleService.findByCompanyId(this.selectedCompanyId)
        } else {
          //if user is not admin
          // this.routes = await this.routeService.findAll()
        }

        this.loading = false;
      }

      if(this.phase === 2) {
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

  save() {
    this.loading = true;
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
