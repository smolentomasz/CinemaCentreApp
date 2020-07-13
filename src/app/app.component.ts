import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CinemaCentreApp';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUser();
  }
}
