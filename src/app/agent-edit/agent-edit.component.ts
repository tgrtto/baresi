import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { AgentService } from '../services/agent.service'

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit {

  agent: any;
  agentId: number;
  initialising: boolean = true;
  loading: boolean = false;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private agentService: AgentService,
    private router: Router
  ) {
    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.agentId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
      this.agent = await this.agentService.findById(this.agentId);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.initialising = false;
    }
  }

  async save() {
    try {
      this.error = null;
      this.loading = true;

      if(typeof this.agent['first_name'] !== 'string') {
        throw "Invalid first name"
      }

      if(typeof this.agent['last_name'] !== 'string') {
        throw "Invalid last name"
      }

      if(typeof this.agent['phone'] !== 'string') {
        throw "Invalid phone"
      }

      const obj = await this.agentService.updateById(this.agentId, this.agent['first_name'], this.agent['last_name'], this.agent['phone']);
      this.router.navigate(['/console/agents']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
