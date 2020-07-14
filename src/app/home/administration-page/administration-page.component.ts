import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Schedule, Movie } from '../movies/movie.model';
import { ScheduleService } from '../movies/schedule.service';
import { UserService } from 'src/app/user/user.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-administration-page',
  template: `
    <div class="name-header">Hi, {{ this.activeUser }}</div>
    <div class="administration-movie">
      <h2>Add new movie</h2>
      <mat-divider></mat-divider>
      <mat-label *ngIf="fileName">{{ fileName }}</mat-label>
      <input #fileInput type="file" (change)="onSelectFile($event)" class="file-picker"/>
      <mat-form-field class="menu-inputs">
        <mat-label class="movie-title-label">Movie title</mat-label>
        <input matInput [formControl]="titleAddControl" />
        <mat-error *ngIf="titleAddControl.hasError('required')"
          >Title is required!</mat-error
        >
      </mat-form-field>
      <mat-form-field class="menu-inputs">
        <mat-label>Movie description</mat-label>
        <textarea
          matInput
          cdkTextareaAutosize
          #autosize="cdkTextareaAutosize"
          cdkAutosizeMinRows="1"
          cdkAutosizeMaxRows="5"
          [formControl]="descriptionAddControl"
          class="description-textarea"
        ></textarea>
        <mat-error *ngIf="descriptionAddControl.hasError('required')"
          >Description is required!</mat-error
        >
      </mat-form-field>
      <mat-form-field class="menu-inputs">
        <mat-label class="movie-duration-label">Movie duration</mat-label>
        <input matInput type="number" [formControl]="durationAddControl" />
        <mat-error *ngIf="durationAddControl.hasError('required')"
          >Duration is required!</mat-error
        >
      </mat-form-field>
      <button
        mat-raised-button
        class="add-movie-button"
        (click)="onUploadImage()"
      >
        Add movie
      </button>
      <div class="progress-info">
        <div *ngIf="uploadProgress > 0">{{ uploadProgress }}%</div>
        <div *ngIf="uploadMessage">
          {{ uploadMessage }}
        </div>
      </div>
    </div>
    <div class="administration-schedule">
      <h2>Add new schedule</h2>
      <mat-divider></mat-divider>
      <mat-form-field appearance="fill">
        <mat-label>Movies list</mat-label>
        <mat-select name="movie" [formControl]="movieTitleControl">
          <mat-option *ngFor="let movie of dataMovies" [value]="movie.id">
            {{ movie.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          [formControl]="dateControl"
          readonly
        />
        <mat-error *ngIf="dateControl.hasError('required')"
          >Date is required!</mat-error
        >
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="menu-inputs">
        <mat-label class="start-time-label">Start time</mat-label>
        <input matInput [formControl]="timeControl" />
        <mat-error *ngIf="timeControl.hasError('required')"
          >Time is required!</mat-error
        >
        <mat-error *ngIf="timeControl.hasError('pattern')"
          >Time format hh:mm:ss</mat-error
        >
      </mat-form-field>
      <button
        mat-raised-button
        class="add-schedule-button"
        (click)="onAddSchedule()"
      >
        Add schedule
      </button>
    </div>
  `,
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  selectedValue: string;
  dataMovies;
  private newSchedule: Schedule;
  activeUser: string;
  isActive = false;
  private seletedFile: File = null;
  private newImage: Movie;
  uploadMessage: string;
  uploadProgress: number;
  fileName: string;

  timeControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(([0-1]?[0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]'),
  ]);

  dateControl = new FormControl('', [Validators.required]);

  movieTitleControl = new FormControl('', [Validators.required]);

  titleAddControl = new FormControl('', [Validators.required]);

  durationAddControl = new FormControl('', [Validators.required]);

  descriptionAddControl = new FormControl('', [Validators.required]);

  constructor(
    private moviesService: MoviesService,
    private scheduleService: ScheduleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(
      (response) => (this.dataMovies = response),
      (error) => console.log(error)
    );
    this.userService.user$.subscribe((x) => (this.activeUser = x.unique_name));
  }
  onAddSchedule(): void {
    if (
      this.movieTitleControl.valid &&
      this.dateControl.valid &&
      this.timeControl.valid
    ) {
      const date = formatDate(
        new Date(this.dateControl.value),
        'dd-MM-yyyy',
        'pl-PL'
      );
      this.newSchedule = {
        time: this.timeControl.value,
        date,
        movieId: this.movieTitleControl.value,
      };
      this.scheduleService.addNewSchedule(this.newSchedule).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }
  onSelectFile(event): void {
    this.seletedFile = event.target.files[0];
  }

  onUploadImage(): void {
    if (
      this.titleAddControl.valid &&
      this.descriptionAddControl.valid &&
      this.durationAddControl.valid
    ) {
      const imageFormData = new FormData();
      imageFormData.append('file', this.seletedFile, this.seletedFile.name);

      this.newImage = {
        description: this.descriptionAddControl.value,
        duration: this.durationAddControl.value,
        name: this.titleAddControl.value,
      };

      imageFormData.append('movieDetails', JSON.stringify(this.newImage));

      this.moviesService.addNewMovie(imageFormData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.uploadMessage = 'Upload successfull!';
          console.log(event.body);
        }
      });
    }
  }
}
