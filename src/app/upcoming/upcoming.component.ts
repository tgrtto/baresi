import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { ContextService } from '../context.service'
import { UpcomingService } from '../services/upcoming.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  loading = true;
  upcoming: any = [];
  error:string = "";

  constructor(
    private contextService: ContextService,
    private upcomingService: UpcomingService,
    private router: Router
  ) {
    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.upcoming = await this.upcomingService.findByPageAndSize(0, 50);
      console.log(this.upcoming);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
