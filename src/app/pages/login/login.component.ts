import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../shared/services/login.service";
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, Subscription} from "rxjs";

const users = [
  {
    id: 1,
    first_name: "Admin",
    last_name: "DeeperSignals",
    email: "admin@deepersignals.com",
    password: "password",
    role: "Admin",
    assessment_reports: [
      {
        id: 1,
        name: "Core Drivers",
        users_resolved: 5,
        active: true,
        image_url: "https://d1cuxz3dnd9slg.cloudfront.net/assessments/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg",
        data: {
          Agreeableness: 40,
          Drive: 50,
          Luck: 30,
          Openess: 70
        },
        type: "bar"
      }
    ]
  },
  {
    id: 2,
    first_name: "User",
    last_name: "ShallowSignals",
    email: "user@deepersignals.com",
    password: "password",
    role: "User",
    assessment_reports: [
      {
        id: 1,
        name: "Driver Cors",
        users_resolved: 3,
        active: true,
        image_url: "https://d1cuxz3dnd9slg.cloudfront.net/assessments/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg",
        data: {
          Agreeableness: 13.333333333333334,
          Drive: 21.666666666666668,
          Luck: 10,
          Openess: 30
        },
        type: "bar"
      },
      {
        id: 2,
        name: "test 2",
        users_resolved: 6,
        active: false,
        image_url: "https://d1cuxz3dnd9slg.cloudfront.net/assessments/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg",
        data: {
          Agreeableness: 15,
          Drive: 10.666666666666668,
          Luck: 20,
          Openess: 40
        },
        type: "bar"
      }
    ]
  }
]


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  sub?: Subscription[];

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    localStorage.setItem('user', JSON.stringify(users));
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const subscriber = this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(catchError(err => err))
      .subscribe(() => this.router.navigate(['/']));

    this.sub?.push(subscriber);
  }

  ngOnDestroy(): void {
    this.sub?.forEach(s => s.unsubscribe());
  }
}
