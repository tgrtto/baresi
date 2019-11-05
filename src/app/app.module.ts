import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SortablejsModule } from 'ngx-sortablejs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpRequestInterceptor } from './session.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { RoutesComponent } from './routes/routes.component';
import { RouteNewComponent } from './route-new/route-new.component';
import { RouteViewComponent } from './route-view/route-view.component';
import { RouteEditStopsComponent } from './route-edit-stops/route-edit-stops.component';
import { RouteEditSegmentsComponent } from './route-edit-segments/route-edit-segments.component';
// import { InsightsSearchComponent } from './insights-search/insights-search.component';
import { InsightsCitiesComponent } from './insights-cities/insights-cities.component';
import { InsightsUsersComponent } from './insights-users/insights-users.component';
import { RouteEditSeatsComponent } from './route-edit-seats/route-edit-seats.component';
import { RouteSettingsComponent } from './route-settings/route-settings.component';
import { RouteEditScheduleComponent } from './route-edit-schedule/route-edit-schedule.component';
import { TripsComponent } from './trips/trips.component';
import { TripViewComponent } from './trip-view/trip-view.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';
import { TripNewComponent } from './trip-new/trip-new.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContainerComponent,
    ContentComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RoutesComponent,
    RouteNewComponent,
    RouteViewComponent,
    RouteEditStopsComponent,
    RouteEditSegmentsComponent,
    // InsightsSearchComponent,
    InsightsCitiesComponent,
    InsightsUsersComponent,
    RouteEditSeatsComponent,
    RouteEditScheduleComponent,
    TripsComponent,
    TripViewComponent,
    RouteSettingsComponent,
    VehiclesComponent,
    VehicleEditComponent,
    VehicleNewComponent,
    TripNewComponent
  ],
  imports: [
    NgbModule,
    SortablejsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
