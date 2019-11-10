import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.css']
})
export class VehicleNewComponent implements OnInit {

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

  wifi: boolean = false;
  ac: boolean = false;

  name: string;
  description: string;
  brand: string;
  rows: number;
  columns: number;

  constructor(
    private http: HttpClient,
    private contextService: ContextService,
    private router: Router) {

  }

  save() {
    if(this.name == null) {
      this.error = "Please add a name"
      return;
    }

    if(this.description == null) {
      this.error = "Please add a description"
      return;
    }

    if(this.rows == null || this.rows == 0) {
      this.error = "Please add rows"
      return;
    }

    if(this.columns == null || this.columns == 0) {
      this.error = "Please add columns"
      return;
    }

    if(this.brand == null) {
      this.error = "Please add a brand"
      return;
    }

    if(this.wifi == null) {
      this.error = "Please check whether bus has wifi or not."
      return;
    }

    if(this.ac == null) {
      this.error = "Please check whether bus has ac or not."
      return;
    }

    let name = this.name.trim();
    let description = this.description.trim();
    let brand = this.brand.trim();

    this.http.post(environment.api_url + "/vehicles",
      {
        name: name,
        description: description,
        brand: brand,
        rows: this.rows,
        columns: this.columns,
        wifi: this.wifi,
        ac: this.ac
      })
      .subscribe(
        (data:any)  => {
          this.router.navigate(['/console/vehicles']);
        },
      error  => {
        console.log(error);
        this.error = error.toString();
      });
  }

  ngOnInit() {
  }

}
