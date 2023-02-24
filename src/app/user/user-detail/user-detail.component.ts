import { Component, OnInit } from '@angular/core';
import { User } from "../user.model";
import { ProgressBarMode } from "@angular/material/progress-bar";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  user: User | undefined;
  progressBar: ProgressBarMode = "determinate";
  editing = false;

  constructor() {
  }

  ngOnInit() {

  }
}
