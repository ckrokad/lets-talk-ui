import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	searchedUser;

	private endpoint = environment.apiEndpoints.profile;

	constructor(private http: HttpClient) { }

	changeStatus(status, uid, phoneNumber, displayName){
		const url = this.endpoint;
		const payload = {
			uid: uid,
			status: status,
			phoneNumber: phoneNumber,
			displayName: displayName
		};
		console.log(payload);
		return this.http.post(url, payload);
	}

	getProfileByUid(uid){
		const url = this.endpoint + 'uid/' + uid;
		return this.http.get(url);
	}

	getProfileByPhoneNumber(phoneNumber) {
		const url = this.endpoint + 'pn/+91' + phoneNumber;
		return this.http.get(url);
	}

	changeSearchedUser(user){
		localStorage.setItem('searchedUser', JSON.stringify(user));
		this.searchedUser = user;
	}

	getSearchedUser(){
		return JSON.parse(localStorage.getItem('searchedUser'));
	}
}
