import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleService } from '../movies/schedule.service';
import { Reservation, AddReservation } from '../home.model';
import { User } from 'src/app/user/user.model';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-details',
  template: `
    <h2 class="summary-header">
      Reservation summary
      <mat-icon class="close-details-icon" [mat-dialog-close]>close</mat-icon>
    </h2>
    <mat-divider></mat-divider>
    <div class="details-window">
      <div class="summary-info"><strong>Price per ticket:</strong> 25 zł</div>
      <div class="summary-info">
        <strong>Title:</strong> {{ this.movieTitle }}
      </div>
      <div class="summary-info">
        <strong>Date:</strong> {{ this.movieDate }}
      </div>
      <div class="summary-info">
        <strong>Time:</strong> {{ this.movieTime }}
      </div>
      <div class="summary-info">
        <strong>Selected seats:</strong>
      </div>
      <div class="booked-seats">
        <div *ngFor="let place of seatsList" class="summary-info">
          {{ place }}
        </div>
      </div>
      <div class="summary-info">
        <strong>Summary price:</strong> {{ this.ticketpPrice }} zł
      </div>
      <div class="summary-buttons">
        <button mat-button color="accent" [mat-dialog-close]>Cancel</button>
        <button
          mat-button
          color="accent"
          [mat-dialog-close]
          (click)="onBuyTicket()"
        >
          Buy ticket
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  seanceId: number;
  seatsList: Array<number>;
  movieTitle: string;
  movieDate: string;
  movieTime: string;
  ticketpPrice: number;
  activeUser: User;
  newReservation: AddReservation;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private scheduleService: ScheduleService,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seanceId = this.data.seanceId;
    this.seatsList = this.data.seatsNumbers;
    this.ticketpPrice = 25 * this.seatsList.length;
    this.activeUser = this.data.user;

    this.scheduleService
      .getScheduleById(this.seanceId)
      .subscribe((response) => {
        (this.movieTitle = response.movie.name),
          (this.movieDate = response.date),
          (this.movieTime = response.time);
      });
  }
  onBuyTicket(): void {
    this.newReservation = {
      scheduleId: this.seanceId,
      userId: parseInt(this.activeUser.nameid, 10),
      paid: this.ticketpPrice,
      seatNumbers: this.seatsList,
    };
    this.reservationService.addNewReservation(this.newReservation).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
    this.router.navigate(['/home/movies']);
  }
}
