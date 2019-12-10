import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddformComponent } from "./addform/addform.component";
import { BodyComponent } from "./body/body.component";
import { PopupComponent } from "./popup/popup.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth-guard.service";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "addform", component: AddformComponent, canActivate: [AuthGuard] },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "popup/:id", component: PopupComponent, canActivate: [AuthGuard] },
  { path: "news/:name", component: BodyComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  AddformComponent,
  BodyComponent,
  PopupComponent
];
