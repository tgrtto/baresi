import { Component, OnInit } from '@angular/core';
import { ContextService } from '../context.service'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

import { faSign, faBuilding, faSearch, faExclamation, faHome, faTable, faInfo, faChartLine, faLayerGroup, faUsers, faCity, faRoute, faRoad, faBus } from '@fortawesome/free-solid-svg-icons';

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

  machineMenu = [
    // {
    //   name: 'ABOUT',
    //   menus: [
    //   {
    //     name: 'Home',
    //     link: '/console/home',
    //     icon: faHome
    //   }]
    // },
    {
      name: 'SALES',
      menus: [{
        name: 'Ticket requests',
        link: '/console/ticket_requests',
        icon: faExclamation
      },
      {
        name: 'Search requests / TODO',
        link: '/console/custom_search_requests',
        icon: faSearch
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

  constructor(private contextService: ContextService, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
    // this.activatedRoute.paramMap.subscribe(params => {
    //   console.log('ciao: ' + params);
    // })
    //
    // this.modeSubscription = this.contextService.getMode().subscribe(mode => {
    //   this.mode = mode;
    // });
    //
    // this.machineSubscription = this.contextService.getMachine().subscribe(machine => {
    //   this.machine = machine;
    // });
  }

  ngOnInit() {}

  selectMenu(link) {
    this.router.navigateByUrl(link);
  }
}
