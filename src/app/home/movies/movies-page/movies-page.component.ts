import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(x => console.log(x));
  }

}
