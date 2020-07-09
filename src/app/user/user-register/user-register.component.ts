import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  template: `
  <div class='register-menu'>
      <h2 class='register-title'>Register</h2>
      <form class='register-form'>
      <mat-form-field class='menu-inputs'>
          <mat-label>Name</mat-label>
          <input matInput [formControl]="nameControl"/>
            <mat-error *ngIf="nameControl.hasError('required')">Name is required!</mat-error>
        </mat-form-field>
        <mat-form-field class='menu-inputs'>
          <mat-label>Surname</mat-label>
          <input matInput [formControl]="nameControl"/>
            <mat-error *ngIf="nameControl.hasError('required')">Surname is required!</mat-error>
        </mat-form-field>
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
      <button mat-raised-button class='register-button'>Login</button>
      <p class='login-link'>Already member? <a routerLink="/user/login">Sign in</a>.</p>
    </div>
  `,
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  nameControl = new FormControl('', [
    Validators.required
  ]);

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
