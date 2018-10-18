import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { CallListComponent } from './call-list/call-list.component';
import { ActiveListComponent } from './active-list/active-list.component';
import { ChatComponent } from './chat/chat.component';
import { CallComponent } from './call/call.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigatorComponent } from './navigator/navigator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SignupComponent } from './signup/signup.component';
import { OneTimeComponent } from './one-time/one-time.component';

import { TokenInterceptor } from './services/token.interceptor';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	tosUrl: '',
	// privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
	credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
	declarations: [
		AppComponent,
		ChatListComponent,
		CallListComponent,
		ActiveListComponent,
		ChatComponent,
		CallComponent,
		ProfileComponent,
		NavigatorComponent,
		SignupComponent,
		OneTimeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		FirebaseUIModule.forRoot(firebaseUiAuthConfig),
		FormsModule,
		AngularFireStorageModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
