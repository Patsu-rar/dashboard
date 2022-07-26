import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {UserAssessmentsComponent} from "./pages/user-assessments/user-assessments.component";
import {AssessmentsGraphComponent} from "./pages/assessments-graph/assessments-graph.component";
import {UsersComponent} from "./pages/users/users.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const appRoutes: Routes = [
  { path: "", component: UserAssessmentsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "userassessment/graph", component: AssessmentsGraphComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "**", component: UserAssessmentsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
