import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { FirebaseUISignInFailure } from 'firebaseui-angular';
import { Router } from '@angular/router';
import { ProfileService } from './services/profile.service';
import { SocketService } from './services/socket.service';
import { EventEmitter } from 'events';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public redirectUrl = '/';
	public authCompletedEmitter$: EventEmitter;

	constructor(public afAuth: AngularFireAuth,
		private router: Router,
		private profile: ProfileService,
		private socketService: SocketService) {

		this.authCompletedEmitter$ = new EventEmitter();
		const that = this;
		this.afAuth.authState.subscribe(function (response) {
			// if needed, do a redirect in here
			if (response) {
				// console.log(response);
				// response.getIdToken(true).then(function (token) {
				// 	localStorage.setItem('idToken', token);
					// localStorage.setItem('user', JSON.stringify(response));
				// 	that.profile.getProfileByUid(response.uid).subscribe(function (res) {
				// 		localStorage.setItem('user', JSON.stringify(res));
				// 		that.socketService.initSocket();
				// 		that.authComplete();
				// 	});
				// 	// that.router.navigate(['/']);
				// });
				console.log('Logged in :)');
			} else {
				that.socketService.disconnect();
				localStorage.removeItem('user');
				localStorage.removeItem('idToken');
				console.log('Logged out :(');
			}
		});
	}

	logout() {
		this.socketService.disconnect();
		this.afAuth.auth.signOut();
		localStorage.removeItem('user');
		localStorage.removeItem('idToken');
		localStorage.removeItem('authenticated');
		this.router.navigate(['/login']);
	}

	loginSuccessCallback(data: FirebaseUISignInSuccessWithAuthResult) {
		// console.log('successCallback', data);
		const that = this;
		if (data.authResult.additionalUserInfo.isNewUser){
			console.log('One time details');
			localStorage.setItem('user', JSON.stringify(data.authResult.user));
			data.authResult.user.getIdToken(true).then(function(token){
				localStorage.setItem('idToken', token);
				that.router.navigate(['/onetimedetails']);
			});
		}
		else {
			data.authResult.user.getIdToken(true).then(function (token) {
				localStorage.setItem('idToken', token);
				localStorage.setItem('user', JSON.stringify(data.authResult.user));
				that.profile.getProfileByUid(data.authResult.user.uid).subscribe(function (res) {
					localStorage.setItem('user', JSON.stringify(res));
					that.authComplete();
					that.router.navigate(['/']);
				});
			});
			// this.router.navigate(['/']);
		}
	}

	loginErrorCallback(data: FirebaseUISignInFailure) {
		console.warn('errorCallback', data);
	}

	authComplete(){
		localStorage.setItem('authenticated', 'true');
		this.authCompletedEmitter$.emit('authenticated');
	}
}
