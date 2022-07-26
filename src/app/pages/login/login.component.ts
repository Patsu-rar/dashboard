import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {ActivatedRoute, Router} from '@angular/router';

const users = [
  {
    id: 1,
    first_name: "Admin",
    last_name: "DeeperSignals",
    email: "admin@deepersignals.com",
    password: "password",
    role: "Admin"
  },
  {
    id: 2,
    first_name: "User",
    last_name: "ShallowSignals",
    email: "user@deepersignals.com",
    password: "password",
    role: "User"
  }
]


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    localStorage.setItem('user', JSON.stringify(users));
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe()
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error);
        }
      });
  }
}
