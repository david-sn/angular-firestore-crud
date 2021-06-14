import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: MyUser = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    return this.authService.login(this.user.email, this.user.password);
  }

  signUp() {
    return this.authService.signUp(this.user.email, this.user.password);
  }

  googleLogin(){
   return this.authService.googleLogin();
  }

  logOut(){
    return this.authService.logOut();
   }
}

interface MyUser {
  email: string,
  password: string
}