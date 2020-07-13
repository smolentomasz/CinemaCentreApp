import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `
    <div class="main-menu">
      <h2>Cinema Centre</h2>
      <mat-selection-list #options [multiple]="false" class="options-menu">
        <ng-container *ngFor="let option of menuOptions">
          <mat-list-option [value]="option" (click)=onNavigate(option)>
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

  onNavigate(option: string): void{
    option.toLowerCase();
    switch (option.toLowerCase()){
      case 'options': {
        this.router.navigate(['/home/options']);
        break;
      }
      case 'administration': {
        this.router.navigate(['/home/administration']);
        break;
      }
      case 'logout': {
        this.router.navigate(['/user/login']);
        sessionStorage.clear();
        break;
      }
    }
  }
}
