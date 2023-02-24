import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserListComponent } from "./user/user-list/user-list.component";

const appRoutes: Route[] = [
  {
    path: "user/list",
    component: UserListComponent
  },
  {
    path: "user/new",
    component: UserDetailComponent
  },
  {
    path: "**",
    redirectTo: "user/new",
  }
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}