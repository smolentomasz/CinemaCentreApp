import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat, Reservation, AddReservation, ResponseMessage } from './home.model';

const authenticationHeader = {
  headers: new HttpHeaders({
    authorization: ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationUrl;
  private seatUrl;

  constructor(private http: HttpClient) {
    this.reservationUrl = 'https://localhost:5001/api/reservations';
    this.seatUrl = 'https://localhost:5001/api/seat';
  }

  getAllSeats(): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.seatUrl);
  }
  getReservationsBySeance(seanceId: string): Observable<Reservation[]>{
    authenticationHeader.headers = authenticationHeader.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken'));
    return this.http.get<Reservation[]>(this.reservationUrl + '/' + seanceId, authenticationHeader);
  }
  addNewReservation(newReservation: AddReservation): Observable<ResponseMessage>{
    authenticationHeader.headers = authenticationHeader.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken'));
    return this.http.post<ResponseMessage>(this.reservationUrl, newReservation, authenticationHeader);
  }
}
