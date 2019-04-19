import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../app/homepage/homepage.component';
import { LoginComponent } from '../app/login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '',       component: HomepageComponent },
  {path: 'login',  component: LoginComponent },
  {path: 'register', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
