import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	private endpoint = environment.apiEndpoints.profile;

	constructor(private http: HttpClient) { }

	changeStatus(status, uid){
		const url = this.endpoint;
		const payload = {
			uid: uid,
			status: status
		};
		return this.http.post(url, payload);
	}

	getProfile(uid){
		const url = this.endpoint + uid;
		return this.http.get(url);
	}
}
