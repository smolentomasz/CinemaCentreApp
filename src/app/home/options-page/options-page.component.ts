import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUser, User } from 'src/app/user/user.model';

@Component({
  selector: 'app-options-page',
  template: `
    <div class="name-header">Hi, {{ this.activeUser.unique_name }}</div>
    <div class="options-edit">
      <h2>Edit your account</h2>
      <mat-divider></mat-divider>
      <form class="update-user-form">
        <mat-label class="delete-information"
          >After editing your data you will be automatically redirected to login
          page.</mat-label
        >
        <mat-form-field class="update-inputs">
          <mat-label>Name</mat-label>
          <input matInput [formControl]="nameControl" />
          <mat-error *ngIf="nameControl.hasError('required')"
            >Name is required!</mat-error
          >
        </mat-form-field>
        <mat-form-field class="update-inputs">
          <mat-label>Surname</mat-label>
          <input matInput [formControl]="surnameControl" />
          <mat-error *ngIf="surnameControl.hasError('required')"
            >Surname is required!</mat-error
          >
        </mat-form-field>
        <mat-form-field class="update-inputs">
          <mat-label>Old password</mat-label>
          <input
            matInput
            [type]="hide ? 'password' : 'text'"
            [formControl]="oldPasswordControl"
          />
          <mat-icon matSuffix class="password-icon" (click)="hide = !hide">{{
            hide ? 'visibility_off' : 'visibility'
          }}</mat-icon>
          <mat-error *ngIf="oldPasswordControl.hasError('required')"
            >Password is required!</mat-error
          >
        </mat-form-field>
        <mat-form-field class="update-inputs">
          <mat-label>New password</mat-label>
          <input
            matInput
            [type]="hide ? 'password' : 'text'"
            [formControl]="passwordControl"
            name="password"
            #password
          />
          <mat-icon matSuffix class="password-icon" (click)="hide = !hide">{{
            hide ? 'visibility_off' : 'visibility'
          }}</mat-icon>
          <mat-error *ngIf="passwordControl.hasError('required')"
            >Password is required!</mat-error
          >
        </mat-form-field>
        <mat-form-field class="update-inputs">
          <mat-label>Confirm new password</mat-label>
          <input
            matInput
            [type]="hide ? 'password' : 'text'"
            [formControl]="confirmPasswordControl"
            pattern="{{ password.value }}"
          />
          <mat-icon matSuffix class="password-icon" (click)="hide = !hide">{{
            hide ? 'visibility_off' : 'visibility'
          }}</mat-icon>
          <mat-error *ngIf="confirmPasswordControl.hasError('required')"
            >Password is required!</mat-error
          >
          <mat-error *ngIf="confirmPasswordControl.hasError('pattern')"
            >Password & Confirm Password does not match!</mat-error
          >
        </mat-form-field>
      </form>
      <button mat-raised-button class="edit-user-button" (click)="onUserEdit()">
        Edit data
      </button>
    </div>
    <div class="options-delete">
      <h2>Delete your account</h2>
      <mat-divider></mat-divider>
      <form class="delete-form">
        <mat-label class="delete-information"
          >If you want to delete your account, please type your email
          here:</mat-label
        >
        <mat-form-field class="delete-inputs">
          <mat-label>Email</mat-label>
          <input matInput [formControl]="emailControl" />
          <mat-error *ngIf="emailControl.hasError('required')"
            >Email is required!</mat-error
          >
          <mat-error *ngIf="emailControl.hasError('email')"
            >This is not an email!</mat-error
          >
        </mat-form-field>
      </form>
      <button mat-raised-button class="delte-button" (click)="onDelete()">
        Delete account
      </button>
    </div>
  `,
  styleUrls: ['./options-page.component.scss'],
})
export class OptionsPageComponent implements OnInit {
  activeUser: User;
  public hide = true;
  private editUser: EditUser;

  emailControl = new FormControl('', [Validators.email, Validators.required]);
  nameControl = new FormControl('', [Validators.required]);

  surnameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  confirmPasswordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.passwordControl.value),
  ]);
  oldPasswordControl = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((x) => (this.activeUser = x));
  }

  onDelete(): void {
    if (this.emailControl.valid) {
      this.userService.deleteUser(this.emailControl.value).subscribe(
        (responseMessage) => {
          sessionStorage.clear();
          this.snackBar.open(responseMessage.responseMessage, 'Ok', {
            duration: 2000,
          });
        },
        ({ error }) => this.snackBar.open(error, 'Ok', { duration: 2000 })
      );
      this.router.navigate(['/user/login']);
    }
  }
  onUserEdit(): void {
    if (
      this.nameControl.valid &&
      this.surnameControl.valid &&
      this.oldPasswordControl.valid &&
      this.confirmPasswordControl.valid
    ) {
      this.editUser = {
        name: this.nameControl.value,
        surname: this.surnameControl.value,
        newPassword: this.confirmPasswordControl.value,
        oldPassword: this.oldPasswordControl.value,
      };

      this.userService.editUser(this.editUser, this.activeUser.email).subscribe(
        (reponse) => {
          this.snackBar.open('Operation successfull!', 'Ok', {
            duration: 2000,
          }),
            sessionStorage.clear(),
            this.router.navigate(['/user/login']);
        },
        (error) =>
          this.snackBar.open(error.error, 'Ok', {
            duration: 2000,
          })
      );
    }
  }
}
