import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  public errorMessage = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private _snackbar: MatSnackBar, private authService: AuthService, private router: Router) {
    this.regForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
   }

  ngOnInit() {

      console.log(`this is for username -> `, this.errorMessage.name);

  }

  register() {
      this.authService.register(this.regForm.value)
        .subscribe((data) => {

          this._snackbar.open('Your account was successfully created ', 'Ok', {horizontalPosition: 'right', verticalPosition: 'bottom'});
         this.router.navigateByUrl('/user-login');
      }, (err) => {
            this.errorMessage =err.error.message;
            console.log('the error data ->', this.errorMessage);
    });
}

}
