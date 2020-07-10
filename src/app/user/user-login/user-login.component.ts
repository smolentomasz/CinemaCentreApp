import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from '../user.model';

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
      <button mat-raised-button class='login-button' (click)=onSubmit()>Login</button>
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
  private userLogin: UserLogin;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.emailControl.valid && this.passwordControl.valid){
      this.userLogin = {
        email: this.emailControl.value,
        password: this.passwordControl.value
      };

      this.userService.loginUser(this.userLogin).subscribe(response => {
        sessionStorage.setItem('jwtToken', response.token);
        sessionStorage.setItem('email', response.email);
        sessionStorage.setItem('userType', response.userType);
        sessionStorage.setItem('name', response.name);
        sessionStorage.setItem('surname', response.surname);
        this.router.navigate(['']);
        this.snackBar.open('You have successfully log in!', 'Ok', {duration: 2000});
      });
    }
  }

}
