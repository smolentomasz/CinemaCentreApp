import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  template: `
    <div class="main-image">
    </div>
    <div class="router-div">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
