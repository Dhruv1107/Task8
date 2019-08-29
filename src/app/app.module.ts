import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BodyComponent } from "./body/body.component";
import { PostsService } from "./posts.service";
import { FormComponent } from "./form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UnlessDirective } from "./unless.directive";
import { PopupComponent } from "./popup/popup.component";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { FilterContentPipe } from "./filterContent.pipe";
import { AuthComponent } from "./auth/auth.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

var firebaseConfig = {
  apiKey: "AIzaSyC5H4PIooJCw2b67hnTSuIxtVnMBCkpQ-8",
  authDomain: "newsfeed-6ee3e.firebaseapp.com",
  databaseURL: "https://newsfeed-6ee3e.firebaseio.com",
  projectId: "newsfeed-6ee3e",
  storageBucket: "",
  messagingSenderId: "1065373835109",
  appId: "1:1065373835109:web:08c72b91400933d5"
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    FormComponent,
    routingComponents,
    UnlessDirective,
    PopupComponent,
    FilterContentPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [PostsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
