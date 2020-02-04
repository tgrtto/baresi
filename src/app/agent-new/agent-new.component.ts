import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { AgentService } from '../services/agent.service'
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-agent-new',
  templateUrl: './agent-new.component.html',
  styleUrls: ['./agent-new.component.css']
})
export class AgentNewComponent implements OnInit {

  error: string;
  loading: boolean = false;
  initialising: boolean = true;

  firstName: string;
  lastName: string;
  phone: string;

  constructor(
    private contextService: ContextService,
    private companyService: CompanyService,
    private agentService: AgentService,
    private router: Router) { }

  ngOnInit() {
  }

  async save() {
    try {
      this.error = null;
      this.loading = true;

      if(typeof this.firstName !== 'string') {
        throw "Invalid first name"
      }

      if(typeof this.lastName !== 'string') {
        throw "Invalid last name"
      }

      if(typeof this.phone !== 'string') {
        throw "Invalid phone"
      }

      const obj = await this.agentService.insertOne(this.firstName, this.lastName, this.phone);
      this.router.navigate(['/console/agents']);
    } catch(e) {
      this.error = e.toString();
    }
  }

}
