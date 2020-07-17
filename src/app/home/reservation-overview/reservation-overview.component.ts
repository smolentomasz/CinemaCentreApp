import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../home.model';
import { Observable } from 'rxjs';
import { uniqBy } from 'lodash';
import { map } from 'rxjs/operators';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-overview',
  template: `
    <div class="name-header">Hi, {{ this.activeUser.unique_name }}</div>
    <div class="overview-content">
      <mat-card
        class="reservation-info"
        *ngFor="let uniqReservation of uniqueReservation$ | async"
      >
        <mat-card-header>
          <div mat-card-avatar class="reservation-image"></div>
          <mat-card-title>Cinema reservation</mat-card-title>
          <mat-card-subtitle
            ><strong>UUID:</strong>
            {{ uniqReservation.reservationUUID }}</mat-card-subtitle
          >
        </mat-card-header>
        <mat-card-content>
          <div class="overview-label">Title</div>
          <div>{{ uniqReservation.schedule.movie.name }}</div>

          <div class="overview-label">Date</div>
          <div>{{ uniqReservation.schedule.date }}</div>
          <div class="overview-label">Time</div>
          <div>{{ uniqReservation.schedule.time }}</div>
          <div class="overview-label">Paid</div>
          <div>{{ uniqReservation.paid }} zl</div>
          <div class="overview-label">Seats</div>
          <div class="overview-reserved-seat">
            <ng-container *ngFor="let reservation of allReservation$ | async">
              <div
                *ngIf="
                  reservation.reservationUUID ===
                  uniqReservation.reservationUUID
                "
              >
                <div class="seats-number">
                  <mat-label class="ticket-info">Row:</mat-label>
                  {{ reservation.seat.seatRow }},
                  <mat-label class="ticket-info">nr:</mat-label>
                  {{ reservation.seat.seatNumber }}
                </div>
              </div>
            </ng-container>
          </div>
        </mat-card-content>
        <button
          mat-raised-button
          class="cancel-reservation-button"
          (click)="onCancelReservation(uniqReservation.reservationUUID)"
        >
          Cancel
        </button>
      </mat-card>
    </div>
  `,
  styleUrls: ['./reservation-overview.component.scss'],
})
export class ReservationOverviewComponent implements OnInit {
  allReservation$: Observable<Reservation[]>;
  uniqueReservation$: Observable<Reservation[]>;
  activeUser: User;
  date = '17-07-2020';

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => (this.activeUser = user));
    if (this.activeUser.role === 'ADMIN') {
      this.allReservation$ = this.reservationService.getAllReservations();
    } else {
      const userId = parseInt(this.activeUser.nameid, 10);
      this.allReservation$ = this.reservationService.getAllUserReservations(
        userId
      );
    }
    this.uniqueReservation$ = this.allReservation$.pipe(
      map((reservations) => uniqBy(reservations, 'reservationUUID'))
    );
  }
  onCancelReservation(uuid: string): void {
    this.reservationService.deleteReservation(uuid).subscribe(
      ({ responseMessage }) => {
        this.snackBar.open(responseMessage, 'Ok', { duration: 2000 });
        if (this.activeUser.role === 'ADMIN') {
          this.allReservation$ = this.reservationService.getAllReservations();
        } else {
          const userId = parseInt(this.activeUser.nameid, 10);
          this.allReservation$ = this.reservationService.getAllUserReservations(
            userId
          );
        }
        this.uniqueReservation$ = this.allReservation$.pipe(
          map((reservations) => uniqBy(reservations, 'reservationUUID'))
        );
      },
      (error) =>
        this.snackBar.open(error.responseMessage, 'Ok', { duration: 2000 })
    );
  }
}
