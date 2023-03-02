import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../user.model";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @ViewChild('f') userForm!: NgForm;
  user = this.getEmptyUser();
  progressBar: ProgressBarMode = "determinate";
  editing = false;
  errorMessage = '';

  constructor( private route: ActivatedRoute, private userService: UserService ) {
  }

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
    this.user = {
      ...this.getEmptyUser(),
      user_id: this.user.user_id
    };

    this.userForm.resetForm()
  }

  onSubmit( form: NgForm ) {
    console.log(form.controls);
  }

}
