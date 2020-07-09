import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-login',
  template: `
  <div class='login-menu'>
      <h2 class='login-title'>Login</h2>
      <form class='login-form'>
        <mat-form-field class='menu-inputs'>
          <mat-label>Email</mat-label>
          <input matInput [formControl]="emailControl"/>
            <mat-error *ngIf="emailControl.hasError('required')">Email is required!</mat-error>
            <mat-error *ngIf="emailControl.hasError('email')">This is not an email!</mat-error>
        </mat-form-field>
        <mat-form-field class='menu-inputs'>
          <mat-label>Password</mat-label>
          <input matInput [type]="hide ? 'password' : 'text'" [formControl]="passwordControl"/>
          <mat-icon matSuffix class='password-icon' (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          <mat-error *ngIf="passwordControl.hasError('required')">Password is required!</mat-error>
        </mat-form-field>
      </form>
      <button mat-raised-button class='login-button'>Login</button>
      <p class='registry-link'>Don't have an account? <a routerLink="/user/register">Sign up</a>.</p>
    </div>`,
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  emailControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  passwordControl = new FormControl('', [
    Validators.required
  ]);

  public hide = true;

  constructor() { }

  ngOnInit(): void {
  }

}
