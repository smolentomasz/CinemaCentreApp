import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-menu',
  template: `
    <div class="main-menu">
      <h2>Cinema Centre</h2>
      <mat-selection-list #options [multiple]="false" class="options-menu">
        <mat-list-option [routerLink]="['/home/movies']">
          Movies
        </mat-list-option>
        <mat-list-option [routerLink]="['/home/overview']">
          Reservations
        </mat-list-option>
        <mat-divider></mat-divider>
        <mat-list-option [routerLink]="['/home/options']">
          Options
        </mat-list-option>
        <mat-list-option [routerLink]="['/home/administration']" *ngIf="this.activeUser.role === 'ADMIN'">
          Administration
        </mat-list-option>
        <mat-list-option [routerLink]="['/user/login']">
          Logout
        </mat-list-option>
      </mat-selection-list>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  activeUser: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((x) => (this.activeUser = x));
  }
}
