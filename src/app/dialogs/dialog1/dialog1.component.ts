import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialogdata } from '../../services/dialogdata';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dialog1',
  templateUrl: './dialog1.component.html',
  styleUrls: ['./dialog1.component.css']
})
export class Dialog1Component implements OnInit {
  AddProductForm: FormGroup | any;
  submitted = false;
  
  constructor(
    public dialogref: MatDialogRef<Dialog1Component>,
    @Inject(MAT_DIALOG_DATA) public Dialogdata: Dialogdata,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    ){}

    ngOnInit(){
      this.AddProductForm = this.formBuilder.group({
        productID: ['',Validators.required],
        productName: ['',Validators.required],
        productPrice: ['',Validators.required],
      })
    }
  
    get f() { return this.AddProductForm.controls; }

    onSubmit(){
      this.submitted = true;    
      if (this.AddProductForm.invalid) {
        return;
      }
      this.authService.CreateData(this.AddProductForm.value.productID,this.AddProductForm.value.productName,this.AddProductForm.value.productPrice)
      this.AddProductForm.reset();
      this.onNoClick();
    }
  
    onNoClick(): void {
      this.dialogref.close();
    }
}
