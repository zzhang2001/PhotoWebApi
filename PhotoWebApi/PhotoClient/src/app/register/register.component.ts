import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { RegisterViewModel } from '../viewmodels';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';

// Custom validator function. Two passwords must match.
const PasswordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ?
    null : { 'passwordsNotMatch': true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerViewModel: RegisterViewModel = new RegisterViewModel();
  loading: boolean = false;
  token: string;
  errMsg: string;
  emailPattern: RegExp = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, PasswordMatchValidator);

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
  }

  get email(): AbstractControl { return this.registerForm.get('email'); }
  get password(): AbstractControl { return this.registerForm.get('password'); }
  get confirmPassword(): AbstractControl { return this.registerForm.get('confirmPassword'); }

  Register(): void {
    this.loading = true;
    this.registerViewModel = this.registerForm.value;

    this.userService.Register(this.registerViewModel).subscribe(
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
