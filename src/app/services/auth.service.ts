import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getDatabase, ref, set} from "firebase/database";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) {
    this.LoginState();
  }

  LoginState(){
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          this.LoginState();
          if (user) {
            this.router.navigate(['productlist']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        //window.alert(error.message);
      });
  }

  registeration(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('Register success');
        this.router.navigate(['login']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error.code);
        //window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      password: user.password,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  CreateData(productid:string,productname:string,productprice:number){
    const db = getDatabase();
    set(ref(db, 'products/'+ productid), {
      ID: productid,
      NAME: productname,
      PRICE: productprice
    });
  }

  SearchProductName(value:string){
    return this.afs.collection('products', ref => ref.where('ID', '==', value)
    .where('NAME', '==', value))
    .snapshotChanges()
  }

}
