import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { StopService } from '../services/stop.service';

@Component({
  selector: 'app-stop-edit',
  templateUrl: './stop-edit.component.html',
  styleUrls: ['./stop-edit.component.css']
})
export class StopEditComponent implements OnInit {

  initialising: boolean = true;
  loading: boolean = false;
  error: string;

  stopId: number;

  stop: any;

  popularAnswers = [{
      title: 'Yes',
      value: 'true'
    },
    {
      title: 'No',
      value: 'false'
  }];

  constructor(
    private contextService: ContextService,
    private stopService: StopService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.stopId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

      this.initialise();
  }

  async initialise() {
    try {
      this.stop = await this.stopService.findById(this.stopId);

      if(typeof this.stop['popular'] !== 'boolean') {
        throw "Invalid popular type"
      }

      this.stop['popular'] = this.stop['popular'].toString();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.initialising = false;
    }
  }

  ngOnInit() {
  }

  async save() {
    try {
      if(typeof this.stop['name'] !== 'string') {
        throw "Invalid name"
      }

      if(typeof this.stop['country'] !== 'string') {
        throw "invalid country"
      }

      if(typeof this.stop['timezone'] !== 'string') {
        throw "invalid timezone"
      }

      if(typeof this.stop['popular'] !== 'string') {
        throw "invalid popular parameter"
      }

      this.error = null;
      this.loading = true;

      const popular = (this.stop['popular'] === 'true');
      this.stop = await this.stopService.updateById(this.stopId, this.stop['name'], popular, this.stop['country'], this.stop['timezone']);
      if(typeof this.stop['popular'] !== 'boolean') {
        throw "Invalid popular type"
      }

      this.stop['popular'] = this.stop['popular'].toString();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
