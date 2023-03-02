import { Component, OnInit } from '@angular/core';
import { UserListItem } from "../user.model";
import { UserService } from "../user.service";
import { UserTableDataSource } from "./user-table.datasource";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  dataSource = new UserTableDataSource(this.userService)
  displayedColumns = [
    'id',
    'user_name',
    'name',
    'email',
    'department',
    'status',
    'action'
  ];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.dataSource.loadUsers()
  }
}
