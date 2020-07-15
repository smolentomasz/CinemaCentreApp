import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Schedule } from './movie.model';

const authenticationHeader = {
  headers: new HttpHeaders({
    authorization: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private moviesGetAllUrl: string;

  constructor(private http: HttpClient) {
    this.moviesGetAllUrl = 'https://localhost:5001/api/movies';
  }

  getAllMovies(){
    return this.http.get(this.moviesGetAllUrl);
  }
  addNewMovie(newData: FormData){
    return this.http.post(this.moviesGetAllUrl, newData, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
      }),
    });
  }
}
