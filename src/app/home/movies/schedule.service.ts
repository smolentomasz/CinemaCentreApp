import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Schedule } from './movie.model';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../home.model';

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


  addNewSchedule(schedule: Schedule): Observable<ResponseMessage>{
    authenticationHeader.headers = authenticationHeader.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken'));
    return this.http.post<ResponseMessage>(this.scheduleUrl, schedule, authenticationHeader);
  }
  getSchedulesByMovie(movieId: string): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.scheduleUrl + '/' + movieId);
  }
  getScheduleById(scheduleId: number): Observable<Schedule>{
    return this.http.get<Schedule>(this.scheduleUrl + '/single/' + scheduleId);
  }
}
