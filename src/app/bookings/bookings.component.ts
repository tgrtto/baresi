import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';

import { ContextService } from '../context.service'
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  loading: boolean = true;
  bookings: any = [];
  error:string = "";

  constructor(
    private contextService: ContextService,
    private bookingService: BookingService,
    private router: Router) {
      this.initialise();
    }

  ngOnInit() {}

  async initialise() {
    try {
      this.bookings = await this.bookingService.findAll();
      console.log(this.bookings);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
