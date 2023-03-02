export class User {
  constructor(
    public user_id: number,
    public user_name: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public user_status: boolean | string,
    public department: string
  ) {
  }
}

export interface UserListItem {
  user_id: number | string,
  user_name: string,
  first_name: string,
  last_name: string,
  email: string,
  user_status: boolean | string,
  department: string
}


