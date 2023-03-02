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
}
