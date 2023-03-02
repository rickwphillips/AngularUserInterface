import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../user.model";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";
import { logMessages } from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [MatSnackBar]
})
export class UserDetailComponent implements OnInit {
  @ViewChild('f') userForm!: NgForm;
  user = this.getEmptyUser();
  progressBar: ProgressBarMode = "determinate";
  editing = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.user = this.userService.getUserById(id) ?? this.getEmptyUser();

    this.route.params.subscribe(( params: Params ) => {

      this.user = this.userService.getUserById(params['id']) ?? this.getEmptyUser();

    })
  }

  getEmptyUser() {
    return new User(0, '', '', '', '', true, '');
  }

  clearForm() {
    this.errorMessage = "";
    this.user = {
      ...this.getEmptyUser(),
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
          { duration: 1000})
      },
        err => {
          if (err.status == 400) {
            this.errorMessage = err.error.message
            return this._snackBar.open(
              `Please provide a unique User Name`,
              'OK',
              { duration: 1000});
          }
          return this._snackBar.open(
            `Something went wrong. Please try again.`,
            'OK',
            { duration: 1000});
        })
    }

    if (!this.user.user_id) {
      return this.userService.createUser(this.user).subscribe(
        () => {
          this._snackBar.open(
          `User ${this.user.user_name} has successfully been created!`,
          'OK',
          { duration: 1000})
          this.user = this.getEmptyUser();
          this.userForm.resetForm();
      },
        err => {
          if (err.status == 400) {
            this.errorMessage = err.error.message
            return this._snackBar.open(
              `Please provide a unique User Name`,
              'OK',
              { duration: 1000});
          }
          return this._snackBar.open(
            `Something went wrong. Please try again.`,
            'OK',
            { duration: 1000});
        })
    }
    return;
  }

}
