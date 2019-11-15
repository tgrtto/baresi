import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { StopService } from '../services/stop.service';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.css']
})
export class StopsComponent implements OnInit {

  loading: boolean = true;
  stops: any = [];
  error:string = "";

  constructor(
    private contextService: ContextService,
    private stopService: StopService,
    private router: Router) {
      this.initialise();
    }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.stops = await this.stopService.findAll();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
