import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Schedule } from './movie.model';
import { Observable } from 'rxjs';

const authenticationHeader = {
  headers: new HttpHeaders({
    authorization: ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private scheduleUrl: string;
  constructor(private http: HttpClient) { 
    this.scheduleUrl = 'https://localhost:5001/api/schedule';
  }


  addNewSchedule(schedule: Schedule): Observable<Schedule>{
    authenticationHeader.headers = authenticationHeader.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken'));
    return this.http.post<Schedule>(this.scheduleUrl, schedule, authenticationHeader);
  }
  getSchedulesByMovie(movieId: string): Observable<Schedule>{
    return this.http.get<Schedule>(this.scheduleUrl + '/' + movieId);
  }
}
