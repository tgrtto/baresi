import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { StopService } from '../services/stop.service';

@Component({
  selector: 'app-stop-new',
  templateUrl: './stop-new.component.html',
  styleUrls: ['./stop-new.component.css']
})
export class StopNewComponent implements OnInit {

  loading: boolean = true;
  error: string;

  name: string;
  country: string;
  popular: string = "false";
  timezone: string = 'Africa/Nairobi';

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
    private router: Router) {
  }

  ngOnInit() { }

  async save() {
    try {
      if(typeof this.name !== 'string') {
        throw "Invalid name"
      }

      if(typeof this.country !== 'string') {
        throw "invalid country"
      }

      if(typeof this.timezone !== 'string') {
        throw "invalid timezone"
      }

      if(typeof this.popular !== 'string') {
        throw "invalid popular parameter"
      }

      this.error = null;
      this.loading = true;

      const popular = (this.popular === 'true');
      await this.stopService.insertOne(this.name, popular, this.country, this.timezone);
      this.router.navigate(['/console/stops']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }

  }

}
