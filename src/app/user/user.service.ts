import { Injectable } from '@angular/core';
import { from, Observable, ObservedValueOf, of, Subject, Subscription, tap } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";

const USERS_API = "/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: User[] = [];

  constructor( private http: HttpClient ) {}

  fetchUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(USERS_API)
      .pipe(tap(( { users } ) => {
        this._users = users
        return [...this._users]
      }))
  }


  getUserById( id: number ): User | undefined {
    const user = this._users.find(u => u.user_id === id);
    return user ? { ...user } : undefined;
  }

  saveUser( user: User) {
    return this.http.put(USERS_API + "/" + user.user_id, {...user})
  }

  createUser( user: User) {
    const _user  = {
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      department: user.department,
      user_status: user.user_status
    }
    return this.http.post(USERS_API, {..._user})
  }

  deleteUser( user_id: number ) {
    return this.http.delete(USERS_API + "/" + user_id)
  }
}
