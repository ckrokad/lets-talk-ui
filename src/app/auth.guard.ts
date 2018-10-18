import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private afAuth: AngularFireAuth, private auth: AuthService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		const status = localStorage.getItem('user') !== null;
		if (status && state.url === '/login') {
			this.router.navigate(['/']);
			return false;
		}
		else if (!status && state.url === '/login') {
			return true;
		}
		else if (!status && state.url !== '/login') {
			this.router.navigate(['/login']);
			return false;
		}
		else if (status && state.url !== '/login') {
			return true;
		}
		// return this.checkLogin(state.url);
	}

	// checkLogin(url: string): boolean {

	// 	// console.log(this.auth.afAuth.authState.pipe(map(user => user !== null)));

	// 	// if (this.afAuth.authState.pipe(map(user => user !== null))){ return true; }

	// 	if (localStorage.getItem('user') !== null) {
	// 		// if (url === '/login') {
	// 		// 	this.router.navigate(['/']);
	// 		// 	return false;
	// 		// }
	// 		return true;
	// 	}

	// 	this.auth.redirectUrl = url;
	// 	console.log('guarding');
	// 	this.router.navigate(['/login']);
	// 	return false;
	// }
}
