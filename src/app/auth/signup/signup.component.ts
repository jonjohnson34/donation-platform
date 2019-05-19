import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passMatch: string;
  accept_terms = false;
  error: string;
  values = '';

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if ( form.invalid ) {
      return;
    } else {
      this.auth.createUser(
        form.value.email,
        form.value.first_name,
        form.value.last_name,
        form.value.password,
        form.value.role);
    }
  }


}
