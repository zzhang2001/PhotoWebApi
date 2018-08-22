import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginViewModel } from '../viewmodels';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginViewModel: LoginViewModel = new LoginViewModel();
  loading: boolean = false;
  token: string;
  errMsg: string;
  emailPattern: RegExp = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    console.log(this.loginForm);
  }

  get email(): AbstractControl { return this.loginForm.get('email'); }
  get password(): AbstractControl { return this.loginForm.get('password'); }

  Login(): void {
    this.loading = true;
    this.loginViewModel = this.loginForm.value;

    this.userService.Login(this.loginViewModel).subscribe(
      result => {
        this.token = result;
        this.loading = false;
        this.userService.saveToken(this.token);
        this.userService.SetUserFromToken();
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        // Provide description error message based on http response status code.
        if (err.status == 400) {
          this.errMsg = err.error;
        }
        else {
          this.errMsg = err.message;
        }
        this.loading = false;
      });
  }
}
