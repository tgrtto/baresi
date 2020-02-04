import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

import { ContextService } from '../context.service'
import { AuthService } from '../auth.service'

import { faTicketAlt, faDollarSign, faBookmark, faSign, faBuilding, faSearch, faExclamation, faHome, faTable, faInfo, faChartLine, faLayerGroup, faUsers, faCity, faRoute, faRoad, faBus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selectedMenuName = "Reports";
  machineSubscription:Subscription;
  modeSubscription:Subscription;
  machine: any;
  mode:any;
  manager: any = {};

  adminMenu = [
    {
      name: 'GENERAL',
      menus: [
      {
        name: 'Upcoming trips',
        link: '/console/upcoming',
        icon: faBookmark
      }]
    },
    {
      name: 'SALES',
      menus: [
      {
        name: 'Bookings',
        link: '/console/bookings',
        icon: faTicketAlt
      },
      {
        name: 'Ticket requests',
        link: '/console/ticket_requests',
        icon: faExclamation
      },
      {
        name: 'Transactions',
        link: '/console/transactions',
        icon: faDollarSign
      }
      ]
    },
    {
      name: 'PLANNING',
      menus: [
      {
        name: 'Routes',
        link: '/console/routes',
        icon: faRoute
      },
      {
        name: 'Trips',
        link: '/console/trips',
        icon: faRoad
      },
      {
        name: 'Vehicles',
        link: '/console/vehicles',
        icon: faBus
      },
      {
        name: 'Stops',
        link: '/console/stops',
        icon: faSign
      },
      {
        name: 'Companies',
        link: '/console/companies',
        icon: faBuilding
      }]
    },
    {
      name: 'OPERATIONS',
      menus: [{
        name: 'Agents',
        link: '/console/agents',
        icon: faUsers
      }]
    },
    {
      name: 'INSIGHTS',
      menus: [{
        name: 'Cities / TODO',
        link: '/console/insights/cities',
        icon: faCity
      },
      {
        name: 'Users / TODO',
        link: '/console/insights/users',
        icon: faUsers
      }]
    }
  ];

  thirdPartyMenu = [
    {
      name: 'SALES',
      menus: [{
        name: 'Ticket requests',
        link: '/console/ticket_requests',
        icon: faExclamation
      },
      {
        name: 'Upcoming',
        link: '/console/upcoming',
        icon: faBookmark
      }]
    },
    {
      name: 'PLANNING',
      menus: [
      {
        name: 'Routes',
        link: '/console/routes',
        icon: faRoute
      },
      {
        name: 'Trips',
        link: '/console/trips',
        icon: faRoad
      },
      {
        name: 'Vehicles',
        link: '/console/vehicles',
        icon: faBus
      }]
    },
    {
      name: 'OPERATIONS',
      menus: [{
        name: 'Agents',
        link: '/console/agents',
        icon: faUsers
      }]
    }
  ];

  constructor(
    private contextService: ContextService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    this.manager = this.authService.currentUserValue;
  }

  ngOnInit() {}

  selectMenu(link) {
    this.router.navigateByUrl(link);
  }
}
