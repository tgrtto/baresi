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
  selectedCompanyId: any;

  selectableStops: any = [];
  selectedStops: any = [];
  route: any = {};
  error: string;
  phase: number = 0;

  selectedStop: any;
    // {
    //   name: 'Group',
    //   type: 'group',
    //   icon: 'layer-group'
    // },


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
    this.loading = true;
    this.selectableStops = await this.stopService.findAll();
    this.selectableCompanies = await this.companyService.findAll();
    this.loading = false
  }

  removeRouteStop(rs) {
    const index = this.selectedStops.findIndex((x) => { return rs.id === x.id});
    this.selectedStops.splice(index, 1);
  }

  selectStop(stop) {
    this.selectedStop = stop;
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

      if(this.selectedStops == null) {
        throw "Invalid stops"
      }

      if(this.selectedStops.length < 2) {
        throw "You need at least 2 stops"
      }

      if(isNaN(this.selectedCompanyId)) {
        throw "Invalid company"
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

      const route = await this.routeService.insertOne(this.selectedCompanyId, this.selectedStops);
      this.router.navigate(['/console/routes/' + route['id'] + '/edit/segments']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
