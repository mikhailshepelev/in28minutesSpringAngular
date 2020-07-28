import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HardcodedAuthenticationService} from "../service/hardcoded-authentication.service";
import {BasicAuthenticationService} from "../service/basic-authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'user'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false;

  //router is dependency injection, injected behind the scene
  constructor(private router : Router,
              private basicAuthenticationService : BasicAuthenticationService,
              private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {

    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      //Redirect to welcome page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin() {
    this.basicAuthenticationService.executeBasicAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome', this.username])
          this.invalidLogin = false;
        },
        error => {
          console.log(error)
          this.invalidLogin = true;
        }
      )
  }
}
