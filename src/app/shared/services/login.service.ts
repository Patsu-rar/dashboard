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

  isLogged = false;
  isAdmin = false;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/login`, {email, password})
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.isLogged = true;
        if (JSON.parse(sessionStorage.getItem('user')!).role === 'Admin') {
          this.isAdmin = true;
        }
        console.log(this.isAdmin, this.isLogged);
        this.userSubject?.next(user);
        return user;
      }));
  }

  logout() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null as any);
    this.isLogged = false;
    this.isAdmin = false;
    console.log(this.isLogged, this.isAdmin);
    this.router.navigate(['/login']);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}
