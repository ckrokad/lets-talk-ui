import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor() { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if(request.url.match(/api\//)){
			console.log('api request');
			const token = localStorage.getItem('idToken');
			request = request.clone({
				headers: request.headers.set('Authorization', token)
			});
		}
		console.log('http request');
		return next.handle(request);
	}
}
