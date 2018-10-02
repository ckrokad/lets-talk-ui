import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { FirebaseUISignInFailure } from 'firebaseui-angular';

declare var M(): any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'lets-talk-ui';

	constructor(private afAuth: AngularFireAuth){
	}

	ngOnInit(): void {
		//this.afAuth.authState.subscribe(this.firebaseAuthChangeListener);
	}
}

