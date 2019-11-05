import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { SortablejsOptions } from 'ngx-sortablejs'

function UUID() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

@Component({
  selector: 'app-route-edit-stops',
  templateUrl: './route-edit-stops.component.html',
  styleUrls: ['./route-edit-stops.component.css']
})
export class RouteEditStopsComponent implements OnInit {

  loading = true;
  routeId: string;
  selectableStops: any = [];
  selectedStops: any = [];
  selectedStop: any;
  route: any = {};
  mode: string = 'segments';
  error: string;

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
    this.routeId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/stops')
      .subscribe(
        (data:any)  => {
          this.selectableStops = data.stops;

          this.http.get(environment.api_url+ '/routes/' + this.routeId)
            .subscribe(
              (data:any)  => {
                this.route = data.route;

                for(let s of this.route.stops) {
                  for(let ss of this.selectableStops) {
                    if(s.stop_id === ss.id) {
                      this.selectedStops.push({
                        name: s.stop_name,
                        stop_id: ss.id,
                        departure_day: s.departure_day,
                        departure_hour: s.departure_hour,
                        departure_minute: s.departure_minute,
                        id: UUID()
                      });
                    }
                  }
                }

                this.loading = false;
              },
            error  => {
              console.log("Error", error);
            });
        },
      error  => {
        console.log("Error", error);
      });
  }

  selectStop(stop) {
    this.selectedStop = stop;
  }

  save() {
    this.loading = true;
    this.http.put(environment.api_url + "/routes/" + this.routeId + "/stops",
      {
        stops: this.selectedStops
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
