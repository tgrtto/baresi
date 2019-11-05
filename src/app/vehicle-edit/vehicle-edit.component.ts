import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ContextService } from '../context.service'
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  vehicleId: string;
  error: string;
  wifiAnswers = [{
      title: 'Yes',
      value: true
    },
    {
      title: 'No',
      value: false
  }];
  acAnswers = [{
      title: 'Yes',
      value: true
    },
    {
      title: 'No',
      value: false
  }];
  vehicle: any;
  loading: boolean = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private contextService: ContextService, private router: Router) {
    this.vehicleId = this.activatedRoute.snapshot.paramMap.get("id");

    this.http.get(environment.api_url+ '/vehicles/' + this.vehicleId)
      .subscribe(
        (data:any)  => {
          this.vehicle = data.vehicle;
          console.log(this.vehicle);

          this.loading = false;
        },
      error  => {
        console.log("Error", error);
      });
  }

  onItemChange(item) {
    console.log(item);
  }

  save() {
    if(this.vehicle == null) {
      this.error = "vehicle object not found"
      return;
    }

    if(this.vehicle['name'] == null) {
      this.error = "Please add a name"
      return;
    }

    if(this.vehicle['description'] == null) {
      this.error = "Please add a description"
      return;
    }

    if(this.vehicle['rows'] == null || this.vehicle['rows'] == 0) {
      this.error = "Please add rows"
      return;
    }

    if(this.vehicle['columns'] == null || this.vehicle['columns'] == 0) {
      this.error = "Please add columns"
      return;
    }


    if(this.vehicle['brand'] == null) {
      this.error = "Please add a brand"
      return;
    }

    if(this.vehicle['wifi'] == null) {
      this.error = "Please check whether bus has wifi or not."
      return;
    }

    if(this.vehicle['ac'] == null) {
      this.error = "Please check whether bus has ac or not."
      return;
    }

    let name = this.vehicle['name'].trim();
    let description = this.vehicle['description'].trim();
    let brand = this.vehicle['brand'].trim();

    this.loading = true;
    this.http.put(environment.api_url + "/vehicles/" + this.vehicleId,
      {
        name: name,
        description: description,
        brand: brand,
        rows: this.vehicle['rows'],
        columns: this.vehicle['columns'],
        wifi: this.vehicle['wifi'],
        ac: this.vehicle['ac']
      })
      .subscribe(
        (data:any)  => {
          this.loading = false;
          // this.router.navigate(['/console/vehicles']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }

  ngOnInit() {
  }

}
