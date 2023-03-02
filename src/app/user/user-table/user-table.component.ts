import { Component, OnInit } from '@angular/core';
import { User, UserListItem } from "../user.model";
import { UserService } from "../user.service";
import { UserTableDataSource } from "./user-table.datasource";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [MatSnackBar]
})
export class UserTableComponent implements OnInit {
  dataSource = new UserTableDataSource(this.userService)
  displayedColumns = [
    'user_name',
    'name',
    'email',
    'department',
    'status',
    'action'
  ];

  constructor(private userService: UserService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.dataSource.loadUsers()
  }

  confirmDeleteUser( user: User) {
    if (window.confirm(`Are you sure you want to delete ${user.user_name}? This cannot be undone.`)) {

      this.userService.deleteUser(user.user_id).subscribe( () => {
        this._snackBar.open("User has been deleted", "OK", {duration: 1000})
        this.dataSource.loadUsers();
      },
        err => {
          this._snackBar.open("Something went wrong. Please try again.", "OK", {duration: 1000})

        })
    }
  }
}
