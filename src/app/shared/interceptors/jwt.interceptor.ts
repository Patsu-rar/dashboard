import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {LoginService} from "../services/login.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.loginService.userValue;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (this.loginService.isLogged && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`
        }
      });
    }

    return next.handle(request);
  }
}
