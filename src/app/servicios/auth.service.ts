import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) { }


  async register({ email, password, username }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      return user;
    } catch (error) {
      throw error;
    }
  } 


  login ({email,password} : any){
    return signInWithEmailAndPassword(this.auth, email,password);
  }

  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user); 
      }, (error) => {
        reject(error); 
      });
    });
  }
  

  logout () {
   return signOut(this.auth);
  }
}
