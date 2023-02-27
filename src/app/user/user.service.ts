import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: User[] = [
    new User(1, 'admin', 'admin', 'example', 'admin@example.com', true, 'IT'),
    new User(2, 'bobross', 'Bob', 'Ross', 'bob@example.com', true, 'Sales'),
    new User(3, 'awonderland', 'Alice', 'Wonderland', 'alice@example.com', true, 'Sales'),
    new User(4, 'timburton', 'Tim', 'Burton', 'tburton@example.com', false, 'IT'),
  ];

  users$ = new Subject<User[]>();
  currentUser$ = new Subject<User>();

  constructor() { }

  getUsers() {
    return [...this._users];
  }

  getUserById( id: number ): User | undefined {
    const user = this._users.find(u => +u.user_id === +id);
    console.log(user, id)
    return user ? {...user} : undefined;
  }
}
