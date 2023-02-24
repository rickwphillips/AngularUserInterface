import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | undefined;
  progressBar: ProgressBarMode = "determinate";
  editing = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!isNaN(id)) {
      this.user = this.userService.getUserById(id);
      console.log(this.user);
    }

    this.route.params.subscribe((params: Params) => {
      if (!isNaN(+params['id'])) this.user = this.userService.getUserById(+params['id']);
      console.log('Sub', this.user);
    })
  }
}
