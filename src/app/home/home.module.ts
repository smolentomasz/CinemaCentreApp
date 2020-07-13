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
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePL, 'pl');

@NgModule({
  declarations: [HomePageComponent, MenuComponent, OptionsPageComponent, AdministrationPageComponent],
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
    MatNativeDateModule
  ]
})
export class HomeModule { }
