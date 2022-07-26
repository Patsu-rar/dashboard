import {Component} from '@angular/core';
import {LoginService} from "../../shared/services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  isLogged = JSON.parse(sessionStorage.getItem('isLogged')!);
  isAdmin = JSON.parse(sessionStorage.getItem('isAdmin')!);

  constructor(public loginService: LoginService) {
  }

  logout(): void {
    this.loginService.logout();
  }
}
