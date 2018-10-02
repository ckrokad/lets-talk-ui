import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from 'firebaseui-angular';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	constructor(private auth: AuthService) { }

	ngOnInit() {
		// this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
	}

	loginSuccessCallback(data: FirebaseUISignInSuccessWithAuthResult) {
		this.auth.loginSuccessCallback(data);
	}

	loginErrorCallback(data: FirebaseUISignInFailure) {
		this.auth.loginErrorCallback(data);
	}
}
