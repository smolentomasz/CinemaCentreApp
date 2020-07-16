import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-movies-page',
  template: `
  <div class="name-header">Hi, {{ this.activeUser.unique_name }}</div>
    <div class="movies-content">
      <div *ngFor="let movie of moviesData" class='movie-section'>
        <div class="movie-poster">
          <img
            [src]="createImagePath(movie.moviePoster)"
            class="movie-poster-image"
            [class.mat-elevation-z8]="!isActive"
            (click)='onDetalisOpen(movie)'
          />
        </div>
        <div class="movie-info">
          {{ movie.name }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  public moviesData;
  activeUser: User;
  isActive = false;
  constructor(
    private userService: UserService,
    private moviesService: MoviesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((x) => (this.activeUser = x));
    this.moviesService.getAllMovies().subscribe(
      (response) => {
        (this.moviesData = response);
      },
      (error) => console.log(error)
    );
  }
  createImagePath(moviePoster: string): string {
    return 'https://localhost:5001/' + moviePoster;
  }
  onDetalisOpen(movie: Movie){
    this.dialog.open(MovieDetailsComponent, {
      data: {
        movie
      },
      panelClass: 'details-dialog-container'
    });
  }
}
