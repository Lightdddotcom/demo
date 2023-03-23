import { Component , OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog1Component } from '../dialogs/dialog1/dialog1.component';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  itemdata: any;
  searchValue: string = "";
  
  constructor(
    private dialog:MatDialog,
    private authService:AuthService,
    private db: AngularFireDatabase
  ){}

  ngOnInit(){
    this.db.list('/products').valueChanges().subscribe( (res) =>
      this.itemdata = res
    );
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog1Component, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  Onsearch(){
    let value = this.searchValue.toLowerCase();
    this.authService.SearchProductName(value)
    .subscribe(result => {
      console.log(result)
      this.itemdata = result;
    })
  }

  delete(value:any) {
    this.db.object('/products/' + value.ID ).remove();
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }

}
