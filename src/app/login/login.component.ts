import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder ,
    private authService:AuthService
  ) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      mainpassword: ['',Validators.required],
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.SignIn(this.loginForm.value.username, this.loginForm.value.mainpassword)
    .catch( err => err.message );
    this.loginForm.reset();
  }
}
