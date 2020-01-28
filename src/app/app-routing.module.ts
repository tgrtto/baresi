import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';

import { RoutesComponent } from './routes/routes.component';
import { RouteViewComponent } from './route-view/route-view.component';
import { RouteEditStopsComponent } from './route-edit-stops/route-edit-stops.component';
import { RouteEditSegmentsComponent } from './route-edit-segments/route-edit-segments.component';
import { RouteEditScheduleComponent } from './route-edit-schedule/route-edit-schedule.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RouteSettingsComponent } from './route-settings/route-settings.component';

import { InsightsUsersComponent } from './insights-users/insights-users.component';
import { InsightsCitiesComponent } from './insights-cities/insights-cities.component';

import { TripsComponent } from './trips/trips.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripNewComponent } from './trip-new/trip-new.component';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyNewComponent } from './company-new/company-new.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

import { TicketRequestsComponent } from './ticket-requests/ticket-requests.component';
import { TicketRequestViewComponent } from './ticket-request-view/ticket-request-view.component';

import { CustomSearchRequestsComponent } from './custom-search-requests/custom-search-requests.component';

import { StopsComponent } from './stops/stops.component';
import { StopEditComponent } from './stop-edit/stop-edit.component';
import { StopNewComponent } from './stop-new/stop-new.component';

import { UpcomingComponent } from './upcoming/upcoming.component';

import { TransactionsComponent } from './transactions/transactions.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component';
import { AgentNewComponent } from './agent-new/agent-new.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  {
      path: 'console',
      component: ContainerComponent,
      children: [
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

        { path: 'ticket_requests', component: TicketRequestsComponent, canActivate: [AuthGuard]},
        { path: 'ticket_requests/:id/view', component: TicketRequestViewComponent, canActivate: [AuthGuard]},
        { path: 'custom_search_requests', component: CustomSearchRequestsComponent, canActivate: [AuthGuard]},

        { path: 'trips', component: TripsComponent, canActivate: [AuthGuard] },
        { path: 'trips/:id/view', component: TripViewComponent, canActivate: [AuthGuard] },
        { path: 'trips/:id/edit', component: TripEditComponent, canActivate: [AuthGuard] },
        { path: 'trips/new', component: TripNewComponent, canActivate: [AuthGuard] },

        { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/settings', component: RouteSettingsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/view', component: RouteViewComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/stops', component: RouteEditStopsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/segments', component: RouteEditSegmentsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/schedule', component: RouteEditScheduleComponent, canActivate: [AuthGuard] },
        { path: 'routes/new', component: RouteNewComponent, canActivate: [AuthGuard]},

        { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
        { path: 'vehicles/:id/edit', component: VehicleEditComponent, canActivate: [AuthGuard] },
        { path: 'vehicles/new', component: VehicleNewComponent, canActivate: [AuthGuard]},

        { path: 'stops', component: StopsComponent, canActivate: [AuthGuard] },
        { path: 'stops/:id/edit', component: StopEditComponent, canActivate: [AuthGuard] },
        { path: 'stops/new', component: StopNewComponent, canActivate: [AuthGuard]},

        { path: 'agents', component: AgentsComponent, canActivate: [AuthGuard] },
        { path: 'agents/:id/edit', component: AgentEditComponent, canActivate: [AuthGuard] },
        { path: 'agents/new', component: AgentNewComponent, canActivate: [AuthGuard]},

        { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },

        { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },

        { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard] },
        { path: 'companies/:id/edit', component: CompanyEditComponent, canActivate: [AuthGuard] },
        { path: 'companies/new', component: CompanyNewComponent, canActivate: [AuthGuard]},

        { path: 'insights/cities', component: InsightsCitiesComponent, canActivate: [AuthGuard]},
        { path: 'insights/users', component: InsightsUsersComponent, canActivate: [AuthGuard]},

        { path: 'upcoming', component: UpcomingComponent, canActivate: [AuthGuard] }
      ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
