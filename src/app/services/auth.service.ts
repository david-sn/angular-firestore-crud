import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth) { 
        this.afAuth.authState.subscribe(sub=>{
            console.log('auth change-----', sub);
            
        })
    }

    login(email: string, password: string) {
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('user loggedIn, ', user);
            });
    }

    signUp(email: string, password: string) {
        this.afAuth.createUserWithEmailAndPassword(email, password).then(user => {
            console.log('user created , ', user);
        })
    }

    googleLogin() {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return this.signInPopUpProvider(googleProvider).then(user=>{
            console.log('user google , ', user);
        });
    }

    signInPopUpProvider(provider: firebase.auth.AuthProvider) {
        return this.afAuth.signInWithPopup(provider);
    }

    logOut() {
        return this.afAuth.signOut();
    }

}


