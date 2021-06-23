import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/login/login-service.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {
  
  form!: FormGroup;
  loginInvalid = false;
  hide:any;
 
  loading$ = this.loader.loading$;

  constructor(
    private router: Router,
    private loginservice: LoginServiceService,
    public loader: LoadingService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  Login() {

    this.loginservice
      .authentificate(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          this.loginInvalid = false;
          this.router.navigate(['/overview']);
          sessionStorage.setItem('password',btoa(this.password.value));
        },
        (error) => {
          this.loginInvalid = true;
          console.log('errr')
        }
      );
  }
  logOut() {
    sessionStorage.removeItem('username');
    console.log("loggeed out")
  }
}
