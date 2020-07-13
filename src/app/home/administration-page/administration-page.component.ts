import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Schedule } from '../movies/movie.model';
import { ScheduleService } from '../movies/schedule.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-administration-page',
  template: `
    <div class="name-header">
      Hi, {{this.activeUser}}
    </div>
    <div class="administration-movie">
      <h2>Add new movie</h2>
      <mat-divider></mat-divider>
    </div>
    <div class="administration-schedule">
      <h2>Add new schedule</h2>
      <mat-divider></mat-divider>
      <mat-form-field appearance="fill">
        <mat-label>Movies list</mat-label>
        <mat-select name="movie" [formControl]="movieTitleControl" >
          <mat-option *ngFor="let movie of dataMovies" [value]="movie.id">
            {{ movie.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="picker" [formControl]="dateControl" readonly/>
        <mat-error *ngIf="dateControl.hasError('required')">Date is required!</mat-error>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="menu-inputs">
        <mat-label class='start-time-label'>Start time</mat-label>
        <input matInput [formControl]="timeControl" />
        <mat-error *ngIf="timeControl.hasError('required')">Time is required!</mat-error>
        <mat-error *ngIf="timeControl.hasError('pattern')">Time format hh:mm:ss</mat-error>
      </mat-form-field>
      <button mat-raised-button class='add-schedule-button' (click)=onAddSchedule()>Add schedule</button>
    </div>
  `,
  styleUrls: ['./administration-page.component.scss'],
})
export class AdministrationPageComponent implements OnInit {
  selectedValue: string;
  dataMovies;
  private newSchedule: Schedule;
  activeUser: string;

  timeControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(([0-1]?[0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]')
  ]);

  dateControl = new FormControl('', [
    Validators.required
  ]);

  movieTitleControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private moviesService: MoviesService, private scheduleService: ScheduleService, private userService: UserService) {}

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(
      (response) => (this.dataMovies = response),
      (error) => console.log(error)
    );
    this.userService.user$.subscribe(x => this.activeUser = x.unique_name);
  }
  onAddSchedule(): void{
    if (this.movieTitleControl.valid && this.dateControl.valid && this.timeControl.valid){
      const date = formatDate(new Date(this.dateControl.value), 'dd-MM-yyyy', 'pl-PL');
      this.newSchedule = {
        time: this.timeControl.value,
        date,
        movieId: this.movieTitleControl.value
      };
      this.scheduleService.addNewSchedule(this.newSchedule).subscribe(response => console.log(response), error => console.log(error));
    }
  }
}
