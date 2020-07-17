import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { last } from 'lodash';
import { Observable } from 'rxjs';
import { Seat, AddReservation, ExtendedSeat } from '../home.model';
import { User } from 'src/app/user/user.model';
import { switchMap } from 'rxjs/operators';
import { map, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservation-page',
  template: `
    <div class="name-header">Hi, {{ this.activeUser.unique_name }}</div>
    <div class="add-reservation-content">
      <h2>Please select seats</h2>
      <mat-divider class="picking-divider"></mat-divider>
      <div
        class="seat-content"
        [ngStyle]="{
          'grid-template-columns':
            'repeat(' + last(seatData$ | async)?.seatNumber + ', 50px)',
          'grid-template-rows':
            'repeat(' + last(seatData$ | async)?.seatRow + ',50px)'
        }"
      >
        <div
          *ngFor="let seat of seatData$ | async"
          [class.is-picked]="seat.isPicked"
          [class.mat-elevation-z8]="!isActive"
          [ngClass]="seat.isClicked ? 'is-selected' : 'not-selected'"
          (click)="onSelectSeat(this.seat)"
        >
          {{ seat.seatNumber }}
        </div>
      </div>
      <div class="screen">S C R E E N</div>
      <button mat-raised-button (click)='onSummaryOpen(this.seanceId, this.seatsToBuy)' class='summary-button'>Summary</button>
    </div>
  `,
  styleUrls: ['./reservation-page.component.scss'],
})
export class ReservationPageComponent implements OnInit {
  last = last;
  activeUser: User;
  seatData$: Observable<ExtendedSeat[]>;
  isActive = false;
  isClicked = false;
  seatsToBuy: Array<number> = [];
  newReservation: AddReservation;
  seanceId: number;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private userService: UserService,
    private reservationDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((x) => (this.activeUser = x));
    const id = this.route.snapshot.paramMap.get('id');
    this.seanceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.seatData$ = this.reservationService.getAllSeats().pipe(
      switchMap((seats) =>
        this.reservationService.getReservationsBySeance(id).pipe(
          take(1),
          map((reservations) =>
            reservations.map((reservation) => reservation.seatId)
          ),
          map((ids) =>
            seats.map((seat) => ({ ...seat, isPicked: ids.includes(seat.id), isClicked: false }))
          )
        )
      )
    );
  }

  onSelectSeat(seat: ExtendedSeat): void {
    if (!seat.isPicked) {
      if (seat.isClicked) {
        seat.isClicked = false;
      }
      else {
        seat.isClicked = true;
      }
      const index = this.seatsToBuy.indexOf(seat.id, 0);
      if (index > -1) {
        this.seatsToBuy.splice(index, 1);
      } else {
        this.seatsToBuy.push(seat.id);
      }
    }
  }

  onSummaryOpen(seanceId: number, seatsNumbers: Array<number>): void{
    if (this.seatsToBuy.length === 0){
      this.snackBar.open('You have to pick one seat at least!', 'Ok', {duration: 2000});
    }
    else{
      this.reservationDialog.open(ReservationDetailsComponent, {
        data: {
          seanceId,
          seatsNumbers,
          user: this.activeUser
        },
        panelClass: 'details-dialog-container'
      });
    }
    
  }
}
