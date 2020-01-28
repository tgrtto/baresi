import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

import { ContextService } from '../context.service'
import { AgentService } from '../services/agent.service'

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  loading: boolean = true;
  agents: any = [];
  error: string;

  constructor(
    private contextService: ContextService,
    private agentService: AgentService,
    private router: Router) {

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.agents = await this.agentService.findAll()
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
