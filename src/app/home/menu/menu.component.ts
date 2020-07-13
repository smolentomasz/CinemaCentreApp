import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `
    <div class="main-menu">
      <h2>Cinema Centre</h2>
      <mat-selection-list #options [multiple]="false" class="options-menu">
        <mat-list-option [routerLink]="['/home/movies']">
          Movies
        </mat-list-option>
        <mat-list-option [routerLink]="['/home/movies']">
          Reservations
        </mat-list-option>
        <mat-divider></mat-divider>
        <mat-list-option [routerLink]="['/home/options']">
          Options
        </mat-list-option>
        <mat-list-option [routerLink]="['/home/administration']">
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
  constructor() {}

  ngOnInit(): void {}
}
