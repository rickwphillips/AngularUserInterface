import { Injectable } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { UserListItem } from "../user.model";
import { BehaviorSubject, Observable, take } from "rxjs";
import { UserService } from "../user.service";

@Injectable()
export class UserTableDataSource extends DataSource<UserListItem> {
  users$ = new BehaviorSubject<UserListItem[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor( private userService: UserService ) {
    super();
  }

  connect(): Observable<UserListItem[]> {
    return this.users$.asObservable();
  }

  override disconnect() {
    this.users$.complete();
  }

  loadUsers(): void {
    this.isLoading$.next(true);
    this.userService.fetchUsers().pipe(take(1))
      .subscribe(( { users } ) => {
        this.users$.next(users);
        this.isLoading$.next(false)
      })
  }


}