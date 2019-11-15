import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service'
import { VehicleService } from '../services/vehicle.service'

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.css']
})
export class VehicleNewComponent implements OnInit {

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

  loading: boolean = false;

  wifi: string = "false";
  ac: string = "false";
  toilet: string = "false";

  selectableCompanies: any = [];
  selectedCompanyId: any;
  phase: number = 0;

  name: string;
  description: string;
  brand: string;
  rows: number;
  columns: number;

  constructor(
    private http: HttpClient,
    private contextService: ContextService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private router: Router) {
      this.initialise();
  }

  async initialise() {
    this.loading = true;
    this.selectableCompanies = await this.companyService.findAll();
    this.loading = false
  }

  nextPhase() {
    try {
      this.error = null;
      if(this.phase === 0 && this.selectedCompanyId == null) {
        throw "You need to select a company"
      }

      this.phase++;
    } catch(e) {
      this.error = e.toString();
    }
  }

  prevPhase() {
    this.phase--;
  }

  async save() {
    try {

      if(typeof this.rows !== 'number' || this.rows == 0) {
        throw "Please add rows"
      }

      if(typeof this.columns !== 'number' || this.columns == 0) {
        throw "Please add columns"
      }

      if(typeof this.brand !== 'string') {
        throw "Please add a brand"
      }

      if(typeof this.wifi !== 'string') {
        throw "Please check whether bus has wifi or not."
      }

      if(typeof this.ac !== 'string') {
        throw "Please check whether bus has ac or not."
      }

      if(typeof this.toilet !== 'string') {
        throw "Please check whether bus has a toilet or not."
      }

      let brand = this.brand.trim();

      const ac = (this.ac === 'true');
      const wifi = (this.wifi === 'true');
      const toilet = (this.toilet === 'true');

      const obj = await this.vehicleService.insertOne(this.selectedCompanyId, brand, ac, wifi, toilet, this.rows, this.columns);
      this.router.navigate(['/console/vehicles']);
    } catch(e) {
      this.error = e.toString();
    }
  }

  ngOnInit() {
  }

}
