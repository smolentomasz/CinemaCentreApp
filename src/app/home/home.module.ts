import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MoviesModule } from './movies/movies.module';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { OptionsPageComponent } from './options-page/options-page.component';
import { AdministrationPageComponent } from './administration-page/administration-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatNativeDateModule } from '@angular/material/core';
import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { CinemaScheduleComponent } from './cinema-schedule/cinema-schedule.component';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationOverviewComponent } from './reservation-overview/reservation-overview.component';
import {MatCardModule} from '@angular/material/card';
registerLocaleData(localePL, 'pl');

@NgModule({
  declarations: [
    HomePageComponent,
    MenuComponent,
    OptionsPageComponent,
    AdministrationPageComponent,
    CinemaScheduleComponent,
    ReservationPageComponent,
    ReservationDetailsComponent,
    ReservationOverviewComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MoviesModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    TextFieldModule,
    MatDialogModule,
    MatCardModule
  ],
})
export class HomeModule {}
