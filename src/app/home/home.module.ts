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
import { FormsModule } from '@angular/forms';;

@NgModule({
  declarations: [HomePageComponent, MenuComponent, OptionsPageComponent, AdministrationPageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MoviesModule,
    MatListModule,
    MatDividerModule,
    FormsModule
  ]
})
export class HomeModule { }
