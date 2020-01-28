import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ContextService } from '../context.service'
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  loading = true;
  routes: any = [];
  error:string = "";

  constructor(
    private contextService: ContextService,
    private routeService: RouteService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async initialise() {
    try {
      // this.routes = await this.routeService.findAll();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
