import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { VehicleService } from '../services/vehicle.service'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  loading: boolean = true;
  vehicles: any = [];
  error: string;

  constructor(
    private contextService: ContextService,
    private vehicleService: VehicleService,
    private router: Router) {

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.vehicles = await this.vehicleService.findAll()
      this.loading = false;
    } catch(e) {
      this.error = e.toString();
    }
  }

}
