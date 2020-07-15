import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../movies/schedule.service';
import { UserService } from 'src/app/user/user.service';
import { FormControl, Validators } from '@angular/forms';
import { withLatestFrom, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Schedule } from '../movies/movie.model';

@Component({
  selector: 'app-cinema-schedule',
  template: `
    <div class="name-header">Hi, {{ this.activeUser.unique_name }}</div>
    <div class='picking-content'>
    <h2>Please select seance</h2>
      <mat-divider class='picking-divider'></mat-divider>
      <mat-form-field appearance="fill">
        <mat-label>Date of seance</mat-label>
        <mat-select name="seance" [formControl]="seanceDateControl">
          <mat-option *ngFor="let seance of scheduleData$ | async" [value]="seance.date">
            {{ seance.date }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <div class='seance-hours-container'>
        <div class='seance-time' *ngFor='let seance of schedules$ | async' [class.mat-elevation-z8]="!isActive">
          {{seance.time}}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cinema-schedule.component.scss']
})
export class CinemaScheduleComponent implements OnInit {

  scheduleData$;
  activeUser;
  isActive = false;
  seanceDateControl = new FormControl('', [Validators.required]);
  schedules$: Observable<Schedule[]>;
  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.user$.subscribe((x) => (this.activeUser = x));
    this.scheduleData$ = this.scheduleService.getSchedulesByMovie(id);

    this.schedules$ = this.seanceDateControl.valueChanges.pipe(
      withLatestFrom(this.scheduleData$),
      map(([value, allSchedules]: [string, Schedule[]]) => allSchedules.filter(
        schedule => schedule.date === value))
    );

    console.log(this.schedules$);
  }

}
