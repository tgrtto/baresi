import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  manager: any;

  constructor(private authService: AuthService) {
    this.manager = this.authService.currentUserValue;
  }

  ngOnInit() {
  }

}
