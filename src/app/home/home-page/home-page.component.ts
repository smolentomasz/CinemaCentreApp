import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
