import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-route-edit-schedule',
  templateUrl: './route-edit-schedule.component.html',
  styleUrls: ['./route-edit-schedule.component.css']
})
export class RouteEditScheduleComponent implements OnInit {

  loading = true;
  route: any = {};
  routeId: string;
  error: string;

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

  weeksOfTheMonth = [{
    name: '1',
    index: 0,
    value: false
  },
  {
    name: '2',
    index: 1,
    value: false
  },
  {
    name: '3',
    index: 2,
    value: false
  },
  {
    name: '4',
    index: 3,
    value: false
  }]

  monthsOfTheYear = [{
    name: 'January',
    index: 0,
    value: false
  },
  {
    name: 'February',
    index: 1,
    value: false
  },
  {
    name: 'March',
    index: 2,
    value: false
  },
  {
    name: 'April',
    index: 3,
    value: false
  },
  {
    name: 'May',
    index: 4,
    value: false
  },
  {
    name: 'June',
    index: 5,
    value: false
  },
  {
    name: 'July',
    index: 6,
    value: false
  },
  {
    name: 'August',
    index: 7,
    value: false
  },
  {
    name: 'September',
    index: 8,
    value: false
  },
  {
    name: 'October',
    index: 9,
    value: false
  },
  {
    name: 'November',
    index: 10,
    value: false
  },
  {
    name: 'December',
    index: 11,
    value: false
  }]

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.routeId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/routes/' + this.routeId)
      .subscribe(
        (data:any)  => {
          this.route = data.route;

          let d, w, m;
          for(let day of this.route['days_of_the_week']) {
            d = this.daysOfTheWeek.find((x) => {
              return x.index == day
            })

            if(d != null) {
              d['value'] = true;
            }
          }

          for(let week of this.route['weeks_of_the_month']) {
            w = this.weeksOfTheMonth.find((x) => {
              return x.index == week
            })

            if(w != null) {
              w['value'] = true;
            }
          }

          for(let month of this.route['months_of_the_year']) {
            m = this.monthsOfTheYear.find((x) => {
              return x.index == month
            })

            if(m != null) {
              m['value'] = true;
            }
          }

          this.loading = false;
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

  selectWeek(w) {
    let week = this.weeksOfTheMonth.find((x) => {
      return x.index == w.index
    })

    if(week != null) {
      week['value'] = !w.value
    }
  }

  selectMonth(m) {
    let month = this.monthsOfTheYear.find((x) => {
      return x.index == m.index
    })

    if(month != null) {
      month['value'] = !m.value
    }
  }

  save() {
    this.loading = true;
    this.http.put(environment.api_url + "/routes/" + this.routeId + "/schedule",
      {
        days_of_the_week: this.daysOfTheWeek.filter((x) => { return x.value }).map((x) => { return x.index}),
        weeks_of_the_month: this.weeksOfTheMonth.filter((x) => { return x.value }).map((x) => { return x.index}),
        months_of_the_year: this.monthsOfTheYear.filter((x) => { return x.value }).map((x) => { return x.index})
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
