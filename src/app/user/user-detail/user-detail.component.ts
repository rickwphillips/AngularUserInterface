import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY_USER, User } from "../user.model";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [MatSnackBar]
})
export class UserDetailComponent implements OnInit {
  @ViewChild('f') userForm!: NgForm;
  user: User = EMPTY_USER;
  progressBar: ProgressBarMode = "determinate";
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.user = this.userService.getUserById(id) ?? EMPTY_USER;

    this.route.params.subscribe(( params: Params ) => {
      console.log(this.route.snapshot)

      this.user = this.userService.getUserById(params['id']) ?? EMPTY_USER;

    })
  }

  clearForm() {
    this.errorMessage = "";
    this.user = {
      ...EMPTY_USER,
      user_id: this.user.user_id,
      user_status: this.user.user_status
    };
  }

  onSubmit( form: NgForm ) {
    if (!this.userForm.valid) {
      return this.errorMessage = "Please provide all required fields"
    }
    this.errorMessage = '';

    if (this.user.user_id) {
      return this.userService.saveUser(this.user).subscribe( next => {
        this._snackBar.open(
          `User ${this.user.user_name} has successfully been updated!`,
          'OK',
          { duration: 2000})
        this.userForm.form.markAsUntouched()
      },
        err => {
          if (err.status == 400) {
            this.errorMessage = err.error.message
            return this._snackBar.open(
              `Please provide a unique User Name`,
              'OK',
              { duration: 2000});
          }
          return this._snackBar.open(
            `Something went wrong. Please try again.`,
            'OK',
            { duration: 2000});
        })
    }

    if (!this.user.user_id) {
      return this.userService.createUser(this.user).subscribe(
        () => {
          this._snackBar.open(
          `User ${this.user.user_name} has successfully been created!`,
          'OK',
          { duration: 2000})
          this.user = EMPTY_USER;
          this.userForm.resetForm();
      },
        err => {
          if (err.status == 400) {
            this.errorMessage = err.error.message
            return this._snackBar.open(
              `Please provide a unique User Name`,
              'OK',
              { duration: 2000});
          }
          return this._snackBar.open(
            `Something went wrong. Please try again.`,
            'OK',
            { duration: 2000});
        })
    }
    return;
  }

}
