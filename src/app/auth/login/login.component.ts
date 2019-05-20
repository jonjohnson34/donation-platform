import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    } else {
      this.auth.login(loginForm.value.email, loginForm.value.password, '');
    }
  }

}
