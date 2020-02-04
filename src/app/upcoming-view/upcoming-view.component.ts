import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { RouteService } from '../services/route.service';
import { BookingService } from '../services/booking.service';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-upcoming-view',
  templateUrl: './upcoming-view.component.html',
  styleUrls: ['./upcoming-view.component.css']
})
export class UpcomingViewComponent implements OnInit {

  initialising: boolean = true;
  loading: boolean = false;
  error: string;

  routeId: number;
  tripId: number;
  date: any;
  stopId: number;

  bookings: any;
  layout: string;
  rows: any;

  selectedBooking: any;

  stops: any;
  sub: any;

  constructor(
    private contextService: ContextService,
    private routeService: RouteService,
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute,
    private tripService: TripService,
    private router: Router) {
      this.initialise();
    }

  ngOnInit() {
  }

  view(row, column) {
    for(let b of this.bookings) {
      if(b['row'] === row && b['column'] === column) {
        this.selectedBooking = b;
        break;
      }
    }
  }

  onStopChange(event) {
    this.stopId = event.target.value;
    this.loadBookings();
  }

  async loadBookings() {
    try {
      this.selectedBooking = null;
      let obj = await this.bookingService.findLayoutByTripIdAndDateAndStopId(this.tripId, this.date, this.stopId);
      this.layout = obj['layout'];
      this.bookings = obj['bookings'];

      this.rows = this.layout.split('\n');
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false
    }
  }

  async initialise() {
    try {
      this.routeId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
      this.date = parseInt(this.activatedRoute.snapshot.paramMap.get("date"));
      this.sub = this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.date = params['date'];
          this.tripId = params['trip_id'];
        });

      this.stops = await this.routeService.findStopsById(this.routeId);
      this.stopId = this.stops[0]['stop_id'];

      this.loadBookings();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.initialising = false;
    }
  }
}
