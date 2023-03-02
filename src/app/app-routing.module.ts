import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { UserTableComponent } from "./user/user-table/user-table.component";

const appRoutes: Route[] = [
  {
    path: "user/edit/:id",
    component: UserDetailComponent
  },
  {
    path: "user/list",
    component: UserTableComponent
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