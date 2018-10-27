import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private router: Router) { }

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
}
