import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

declare var $:any;
declare function createMap(name):any

@Component({
  selector: 'app-insights-users',
  templateUrl: './insights-users.component.html',
  styleUrls: ['./insights-users.component.css']
})
export class InsightsUsersComponent implements OnInit {

  constructor(private http: HttpClient, private contextService: ContextService, private router: Router) {
    createMap('map');
  }

  ngOnInit() {
  }

}
