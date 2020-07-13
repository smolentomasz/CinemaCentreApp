import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, Schedule } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesGetAllUrl: string;

  constructor(private http: HttpClient) {
    this.moviesGetAllUrl = 'https://localhost:5001/api/movies';
  }

  getAllMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.moviesGetAllUrl);
  }
}
