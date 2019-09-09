import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthenticateService {
  user: User;
  isAdmin: boolean;
  isLogin: boolean = false;
  isLoading: boolean;
  comments: string[];
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      this.isLoading = true;
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      email === "dhruv@gmail.com"
        ? (this.isAdmin = true)
        : (this.isAdmin = false);
      this.isLogin = true;
      this.isLoading = false;
      this.router.navigate(["/news/ALL"]);
    } catch (e) {
      this.isLoading = false;
      alert("Error!" + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.isLogin = false;
    this.router.navigate(["/auth"]);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

}
