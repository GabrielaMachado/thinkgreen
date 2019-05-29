import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  registrarUsuario(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(da => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(al => {
        console.log(this.user.email);
        this.user.sendEmailVerification().then(ga => {
          this.logout();

        })
      }

      )
    }

    );
    alert('Estas a un paso de registrarte');

  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['DetalleProducto']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['DetalleProducto']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async googleLogin() {
    try {
      await this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      this.router.navigate(['DetalleProducto']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }
}
