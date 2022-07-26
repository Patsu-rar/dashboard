import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {BehaviorSubject, map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  isLogged?: boolean;
  isAdmin?: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.isLogged = JSON.parse(sessionStorage.getItem('isLogged')!);
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin')!);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/login`, {email, password})
      .pipe(map(user => {

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isLogged', 'true');
        this.isLogged = JSON.parse(sessionStorage.getItem('isLogged')!);
        if (JSON.parse(sessionStorage.getItem('user')!).role === 'Admin') {
          sessionStorage.setItem('isAdmin', 'true');
          this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin')!);
        }

        this.userSubject?.next(user);
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('reports');
    this.userSubject.next(null as any);
    sessionStorage.setItem('isLogged', 'false');
    this.isLogged = JSON.parse(sessionStorage.getItem('isLogged')!);

    sessionStorage.setItem('isAdmin', 'false');
    this.isAdmin = JSON.parse(sessionStorage.getItem('isAdmin')!);

    this.router.navigate(['/login']);
  }
}
