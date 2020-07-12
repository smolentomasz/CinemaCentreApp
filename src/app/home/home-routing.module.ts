import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesPageComponent } from './movies/movies-page/movies-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { AdministrationPageComponent } from './administration-page/administration-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full',
      },
      { path: 'movies', component: MoviesPageComponent },
      { path: 'options', component: OptionsPageComponent},
      { path: 'administration', component: AdministrationPageComponent},
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
