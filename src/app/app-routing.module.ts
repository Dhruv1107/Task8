import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddformComponent } from "./addform/addform.component";
import { BodyComponent } from "./body/body.component";
import { PopupComponent } from "./popup/popup.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "addform", component: AddformComponent },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  { path: "popup/:id", component: PopupComponent },
  { path: ":name", component: BodyComponent }
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
