import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { AuthService } from './auth.service';

// When importing a service onto another service,
// you have to inject the other service into the one you want to use
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(//private authService: AuthService) { }
  ){}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    // request object has to be cloned, otherwise you could cause side effects in webapp
    const authRequest = req.clone({
      headers: req.headers.set('authorization', 'Bearer ' + authToken) // "Bearer + <token>" is a convention for token naming
    });
    return next.handle(authRequest);
  }
}
