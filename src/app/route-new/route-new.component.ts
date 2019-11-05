import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { SortablejsOptions } from 'ngx-sortablejs';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

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

  loading: boolean = false;
  calendar = faCalendar;
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

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.loading = true;
    this.http.get(environment.api_url+ '/stops')
      .subscribe(
        (data:any)  => {
          this.selectableStops = data.stops;
          this.loading = false
        },
      error  => {
        console.log("Error", error);
      });
  }

  selectStop(stop) {
    this.selectedStop = stop;
  }

  ngOnInit() {

  }

  save() {
    this.http.post(environment.api_url + "/routes",
      {
        stops: this.selectedStops
      })
      .subscribe(
        (data:any)  => {
          this.router.navigate(['/console/routes/' + data.route.id + '/edit/segments']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }
}
