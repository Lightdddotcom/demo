import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService
  ) {}
  
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      username: ['',Validators.required],
      mainpassword: ['',Validators.required],
      confirmpassword: ['',Validators.required],
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;    
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.registeration(this.registerForm.value.username, this.registerForm.value.mainpassword)
      .then( res => 
        this.registerForm.reset()
      )
      .catch( err => err.message );
  }
  
}
