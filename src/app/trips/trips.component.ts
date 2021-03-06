import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { TripService } from '../services/trip.service'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  loading: boolean = true;
  trips: any = [];
  error: string;

  constructor(
    private contextService: ContextService,
    private tripService: TripService,
    private router: Router) {

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.trips = await this.tripService.findAll();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
