import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  companyId: number;
  company: any;
  loading: boolean = true;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService,
    private companyService: CompanyService,
    private router: Router) {
    this.companyId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    this.initialise();
  }

  ngOnInit() {
  }

  async initialise() {
    try {
      this.company = await this.companyService.findById(this.companyId);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

  async save() {
    try {
      if(typeof this.company['name'] !== 'string') {
        throw "Invalid name"
      }

      if(typeof this.company['country'] !== 'string') {
        throw "Invalid country"
      }

      let name = this.company['name'].trim();
      let country = this.company['country'].trim().toLowerCase();

      const result = await this.companyService.updateById(this.companyId, name, country);
      this.router.navigate(['/console/companies']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
