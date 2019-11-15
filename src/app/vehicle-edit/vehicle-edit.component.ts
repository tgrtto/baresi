import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { VehicleService } from '../services/vehicle.service'


@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  vehicleId: number;
  error: string;
  wifiAnswers = [{
      title: 'Yes',
      value: 'true'
    },
    {
      title: 'No',
      value: 'false'
  }];
  acAnswers = [{
      title: 'Yes',
      value: 'true'
    },
    {
      title: 'No',
      value: 'false'
  }];
  toiletAnswers = [{
      title: 'Yes',
      value: 'true'
    },
    {
      title: 'No',
      value: 'false'
  }];

  vehicle: any;
  initialising: boolean = true;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private vehicleService: VehicleService,
    private router: Router) {
    this.vehicleId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    this.initialise();
  }

  async initialise() {
    try {
      this.vehicle = await this.vehicleService.findById(this.vehicleId);

      if(typeof this.vehicle['ac'] !== 'boolean') {
        throw "Invalid ac type"
      }

      if(typeof this.vehicle['wifi'] !== 'boolean') {
        throw "Invalid wifi type"
      }

      if(typeof this.vehicle['toilet'] !== 'boolean') {
        throw "Invalid toilet type"
      }

      this.vehicle['ac'] = this.vehicle['ac'].toString();
      this.vehicle['wifi'] = this.vehicle['wifi'].toString();
      this.vehicle['toilet'] = this.vehicle['toilet'].toString();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.initialising = false;
    }
  }

  onItemChange(item) {
    console.log(item);
  }

  async save() {
    try {
      this.error = null;
      this.loading = true;

      if(isNaN(this.vehicle['company_id'])) {
        throw "Invalid company_id"
      }

      if(typeof this.vehicle['brand'] !== 'string') {
        throw "Please add a name"
      }

      if(typeof this.vehicle['rows'] !== 'number' || this.vehicle['rows'] == 0) {
        throw "Please add rows"
      }

      if(typeof this.vehicle['columns'] !== 'number' || this.vehicle['columns'] == 0) {
        throw "Please add columns"
      }

      if(typeof this.vehicle['wifi'] !== 'string') {
        throw "Please check whether bus has wifi or not."
      }

      if(typeof this.vehicle['ac'] !== 'string') {
        throw "Please check whether bus has ac or not."
      }

      if(typeof this.vehicle['toilet'] !== 'string') {
        throw "Please check whether bus has toilet or not."
      }

      let brand = this.vehicle['brand'].trim();

      const ac = (this.vehicle['ac'] === 'true');
      const wifi = (this.vehicle['wifi'] === 'true');
      const toilet = (this.vehicle['toilet'] === 'true');

      const obj = await this.vehicleService.updateById(this.vehicleId, this.vehicle['company_id'], brand, ac, wifi, toilet, this.vehicle['rows'], this.vehicle['columns']);
    } catch(e) {
      console.log(e);
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

  ngOnInit() {
  }

}
