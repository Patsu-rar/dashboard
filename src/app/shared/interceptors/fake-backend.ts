import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

let users = JSON.parse(localStorage.getItem('user')!);

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        default:
          return next.handle(request);
      }
    }

    function authenticate() {
      const { email, password } = body;
      const user = users.find((x: any) => x.email === email && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: 'QWRtaW5Vc2Vy'
      })
    }

    function getUsers() {
      return ok(users.map((x: any) => basicDetails(x)));
    }

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500));
    }

    function error(message: string) {
      return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: any) {
      const { first_name, last_name, role, token } = user;
      return { first_name, last_name, role, token };
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
