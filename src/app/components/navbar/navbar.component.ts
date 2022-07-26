import {Component} from '@angular/core';
import {LoginService} from "../../shared/services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  currentUser = JSON.parse(sessionStorage.getItem('user')!);

  constructor(public loginService: LoginService) {
  }

  logout(): void {
    this.loginService.logout();
  }
}
