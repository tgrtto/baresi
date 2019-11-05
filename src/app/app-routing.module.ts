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
import { RouteEditSeatsComponent } from './route-edit-seats/route-edit-seats.component';
import { RouteEditScheduleComponent } from './route-edit-schedule/route-edit-schedule.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RouteSettingsComponent } from './route-settings/route-settings.component';

import { InsightsUsersComponent } from './insights-users/insights-users.component';
import { InsightsCitiesComponent } from './insights-cities/insights-cities.component';

import { TripsComponent } from './trips/trips.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { TripNewComponent } from './trip-new/trip-new.component';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent},
  {
      path: 'console',
      component: ContainerComponent,
      children: [
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

        { path: 'trips', component: TripsComponent, canActivate: [AuthGuard] },
        { path: 'trips/:id/view', component: TripViewComponent, canActivate: [AuthGuard] },
        { path: 'trips/new', component: TripNewComponent, canActivate: [AuthGuard] },

        { path: 'routes', component: RoutesComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/settings', component: RouteSettingsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/view', component: RouteViewComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/stops', component: RouteEditStopsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/segments', component: RouteEditSegmentsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/seats', component: RouteEditSeatsComponent, canActivate: [AuthGuard] },
        { path: 'routes/:id/edit/schedule', component: RouteEditScheduleComponent, canActivate: [AuthGuard] },
        { path: 'routes/new', component: RouteNewComponent, canActivate: [AuthGuard]},

        { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
        { path: 'vehicles/:id/edit', component: VehicleEditComponent, canActivate: [AuthGuard] },
        { path: 'vehicles/new', component: VehicleNewComponent, canActivate: [AuthGuard]},

        { path: 'insights/cities', component: InsightsCitiesComponent, canActivate: [AuthGuard]},
        { path: 'insights/users', component: InsightsUsersComponent, canActivate: [AuthGuard]},
      ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
