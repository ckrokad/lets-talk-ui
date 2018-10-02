import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { FirebaseUISignInFailure } from 'firebaseui-angular';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public redirectUrl = '/';

	constructor(public afAuth: AngularFireAuth, private router: Router) {
		this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
	}

	private firebaseAuthChangeListener(response) {
		// if needed, do a redirect in here
		if (response) {
			console.log(response);
			localStorage.setItem('user', response);
			console.log('Logged in :)');
		} else {
			localStorage.removeItem('user');
			console.log('Logged out :(');
		}
	}

	logout() {
		this.afAuth.auth.signOut();
		localStorage.removeItem('user');
		this.router.navigate(['/login']);
	}

	loginSuccessCallback(data: FirebaseUISignInSuccessWithAuthResult) {
		console.log('successCallback', data);
		if(data.authResult.additionalUserInfo.isNewUser){
			this.router.navigate(['/onetimedetails']);
		}
		else{
			this.router.navigate(['/']);
		}
	}

	loginErrorCallback(data: FirebaseUISignInFailure) {
		console.warn('errorCallback', data);
	}
}
