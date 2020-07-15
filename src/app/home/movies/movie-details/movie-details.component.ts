import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from '../movie.model';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-movie-details',
  template: `
    <h2>
      {{ movieData.movie.name }}
      <mat-icon class='close-details-icon' [mat-dialog-close]>close</mat-icon>
    </h2>
    <mat-divider></mat-divider>
    <div class="details-window">
      <div class="details-duration-poster">
        <img
          [src]="createImagePath(movieData.movie.moviePoster)"
          class="movie-poster-image"
        />
        <div class="movie-duration">
          Duration: {{ movieData.movie.duration }} min.
        </div>
      </div>
      <div class="movie-description">{{ movieData.movie.description}}</div>
    </div>
    <button mat-button color="accent" [routerLink]="['home/schedule',movieData.movie.id]" [mat-dialog-close]>Buy ticket</button>
  `,
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie) {}

  ngOnInit(): void {
    this.movieData = this.data;
  }

  createImagePath(moviePoster: string): string {
    return 'https://localhost:5001/' + moviePoster;
  }
}
