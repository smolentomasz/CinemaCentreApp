import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `
    <div class="main-menu">
      <h2>Cinema Centre</h2>
      <mat-selection-list #options [multiple]="false" class="options-menu">
        <ng-container *ngFor="let option of menuOptions">
          <mat-list-option [value]="option" [routerLink]="option | lowercase">
            {{ option }}
          </mat-list-option>
          <mat-divider *ngIf="option === 'Reservations'"></mat-divider>
        </ng-container>
      </mat-selection-list>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuOptions: string[] = [
    'Movies',
    'Reservations',
    'Options',
    'Administration',
    'Logout',
  ];
  menuOption: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
