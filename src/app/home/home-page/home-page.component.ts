import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <app-menu></app-menu>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
