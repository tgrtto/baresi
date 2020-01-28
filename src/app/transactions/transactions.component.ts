import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';

import { ContextService } from '../context.service'
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  loading: boolean = true;
  transactions: any = [];
  error:string = "";

  constructor(
    private contextService: ContextService,
    private transactionService: TransactionService,
    private router: Router) {
      this.initialise();
    }

  ngOnInit() {}

  async initialise() {
    try {
      this.transactions = await this.transactionService.findAll();
    } catch(e) {
      this.error = e.toString();
    } finally {
      this.loading = false;
    }
  }

}
