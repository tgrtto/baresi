import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';

import { ContextService } from '../context.service'
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.css']
})
export class CompanyNewComponent implements OnInit {

  name: string;
  country: string;

  loading: boolean = true;
  error: string;

  constructor(
    private contextService: ContextService,
    private companyService: CompanyService,
    private router: Router) {

    }

  ngOnInit() {
  }

  async save() {
    try {
      if(typeof this.name !== 'string') {
        throw "Invalid name"
      }

      if(typeof this.country !== 'string') {
        throw "Invalid country"
      }

      let name = this.name.trim();
      let country = this.country.trim().toLowerCase();

      const result = await this.companyService.insertOne(name, country);
      this.router.navigate(['/console/companies']);
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }
}
