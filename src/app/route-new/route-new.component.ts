import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { SortablejsOptions } from 'ngx-sortablejs';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service';
import { RouteService } from '../services/route.service';
import { StopService } from '../services/stop.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

declare var moment:any;

function UUID() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

@Component({
  selector: 'app-route-new',
  templateUrl: './route-new.component.html',
  styleUrls: ['./route-new.component.css']
})
export class RouteNewComponent implements OnInit {

  removeIcon = faTimes;

  loading: boolean = false;
  calendar = faCalendar;

  selectableCompanies: any = [];
  selectedCompanyId: number;

  selectableRoutes: any = [];
  selectedRouteId: number;
  selectedRoute: any;

  selectableStops: any = [];
  selectedStops: any = [];
  selectedStop: any;

  route: any = {};

  error: string;
  phase: number = 0;

  mode: string = 'new'

  clone1Options: SortablejsOptions = {
    group: {
      name: 'clone-group',
      pull: 'clone',
      put: false
    }
  };

  clone2Options: SortablejsOptions = {
    group: 'clone-group'
  };

  myCloneImplementation = (item) => {
    var clone = {
      name: item.name,
      stop_id: item.id,
      departure_day: 0,
      departure_hour: 0,
      departure_minute: 0,
      id: UUID()
    }

    this.selectStop(clone);
    return clone;
  }

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private stopService: StopService,
    private routeService: RouteService,
    private companyService: CompanyService,
    private router: Router) {

    this.initialise();
  }

  async initialise() {
    try {
      this.loading = true;
      this.selectableStops = await this.stopService.findAll();
      this.selectableCompanies = await this.companyService.findAll();
      this.selectableRoutes = await this.routeService.findAll();
      console.log(this.selectableRoutes);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false
    }
  }

  removeRouteStop(rs) {
    const index = this.selectedStops.findIndex((x) => { return rs.id === x.id});
    this.selectedStops.splice(index, 1);
  }

  selectStop(stop) {
    this.selectedStop = stop;
  }

  selectRoute(route) {
    this.selectedRoute = route;
  }

  async switchMode(newMode: string) {
    try {
      if(typeof newMode !== 'string') {
        throw "new mode is not a string"
      }

      this.mode = newMode;
    } catch(e) {
      this.error = e.toString();
    }
  }

  ngOnInit() {

  }

  nextPhase() {
    try {
      if(this.phase === 0 && this.selectedCompanyId == null) {
        throw "You need to select a company"
      }

      this.error = null;
      this.phase++;
    } catch(e) {
      this.error = e.toString();
    }
  }

  prevPhase() {
    this.phase--;
  }

  async save() {
    try {
      this.error = null;
      this.loading = true;

      let route;

      if(isNaN(this.selectedCompanyId)) {
        throw "Invalid company"
      }

      if(this.mode === 'new') {
        if(this.selectedStops == null) {
          throw "Invalid stops"
        }

        if(this.selectedStops.length < 2) {
          throw "You need at least 2 stops"
        }

        for(let s of this.selectedStops) {
          if(typeof s['departure_day'] !== 'number'|| s['departure_day'] < 0) {
            console.log('found bad number');
            throw "One or more of the departure days is not a valid number"
          }

          if(typeof s['departure_hour'] !== 'number'|| s['departure_hour'] < 0 || s['departure_hour'] > 23) {
            throw "One or more of the departure hours is not a valid number"
          }

          if(typeof s['departure_minute'] !== 'number'|| s['departure_minute'] < 0 || s['departure_minute'] > 59) {
            throw "One or more of the departure minutes is not a valid number"
          }
        }

        route = await this.routeService.insertOne(this.selectedCompanyId, this.selectedStops);
      } else if(this.mode === 'clone') {
        if(this.selectedRoute == null) {
          throw "You need to select one route"
        }

        if(isNaN(this.selectedRoute['id'])) {
          throw "Selected route has an invalid id"
        }

        route = await this.routeService.cloneById(this.selectedCompanyId, this.selectedRoute['id']);
      } else {
        throw "Invalid mode"
      }

      this.router.navigate(['/console/routes/' + route['id'] + '/edit/segments']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
