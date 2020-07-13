import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-options-page',
  template: `
    <div class="name-header">
      Hi, {{this.activeUser}}
    </div>
    <div class="options-edit">
      <h2>Edit your account</h2>
      <mat-divider></mat-divider>
    </div>
    <div class="options-delete">
      <h2>Delete your account</h2>
      <mat-divider></mat-divider>
      <form class='delete-form'>
        <mat-label class='delete-information'>If you want to delete your account, please type your email here: </mat-label>
        <mat-form-field class='delete-inputs'>
          <mat-label>Email</mat-label>
          <input matInput [formControl]="emailControl"/>
            <mat-error *ngIf="emailControl.hasError('required')">Email is required!</mat-error>
            <mat-error *ngIf="emailControl.hasError('email')">This is not an email!</mat-error>
        </mat-form-field>
        </form>
        <button mat-raised-button class='delte-button' (click)=onDelete()>Delete account</button>
    </div>
  `,
  styleUrls: ['./options-page.component.scss'],
})
export class OptionsPageComponent implements OnInit {

  activeUser: string;

  emailControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(x => this.activeUser = x.unique_name);
  }

  onDelete(): void{
    if (this.emailControl.valid){
      this.userService.deleteUser(this.emailControl.value).subscribe(responseMessage => {
        sessionStorage.clear();
        this.snackBar.open(responseMessage.responseMessage, 'Ok', {duration: 2000});
      }, ({error}) => this.snackBar.open(error, 'Ok', {duration: 2000}));
      this.router.navigate(['/user/login']);
    }
  }
}
