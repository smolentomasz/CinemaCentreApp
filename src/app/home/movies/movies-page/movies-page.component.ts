import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-page',
  template: `
    <p>
      movies-page works!
    </p>
  `,
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
