import { Component, OnInit } from '@angular/core';
import { ContextService } from '../context.service'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

import { faCoffee, faHome, faTable, faInfo, faChartLine, faLayerGroup, faUsers, faCity, faRoute, faRoad, faBus } from '@fortawesome/free-solid-svg-icons';

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
    {
      name: 'ABOUT',
      menus: [
      {
        name: 'Home',
        link: '/console/home',
        icon: faHome
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
      name: 'INSIGHTS',
      menus: [{
        name: 'Cities',
        link: '/console/insights/cities',
        icon: faCity
      },
      {
        name: 'Users',
        link: '/console/insights/users',
        icon: faUsers
      }]
    },
    {
      name: 'SALES',
      menus: [{
        name: 'Layers',
        link: '/layers',
        icon: faLayerGroup
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
