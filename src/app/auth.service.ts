import { Subject, Observable } from "rxjs";

export class AuthService {
  public loggedIn = new Subject<boolean>();
  public filteredStatus = new Subject<string>();

  checkLoggedInStatus = (): Observable<any> => this.loggedIn.asObservable();

  setLoginStatus(status: boolean): void {
    this.loggedIn.next(status);
  }

  returnFilteredStatus = (): Observable<any> =>
    this.filteredStatus.asObservable();

  setFilteredStatus(filteredStatus: string): void {
    this.filteredStatus.next(filteredStatus);
  }
}
