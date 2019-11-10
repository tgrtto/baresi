import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  loading: boolean = true;
  companies: any = [];
  error: string;

  constructor(
    private contextService: ContextService,
    private companyService: CompanyService,
    private router: Router) {
      this.initialise()
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.companies = await this.companyService.findAll();
      console.log(this.companies);
      this.loading = false;
    } catch(e) {
      this.error = e.toString();
    }
  }

}
