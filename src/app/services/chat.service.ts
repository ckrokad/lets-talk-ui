import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private endpoint = environment.apiEndpoints.chat;

	constructor(private http: HttpClient) {	}

	getAllChats(){
		return this.http.get(this.endpoint);
	}

	createOrGetChat(withUserProfileId){
		const payload = {
			user1_id: JSON.parse(localStorage.getItem('user')).profile._id,
			user2_id: withUserProfileId
		};
		return this.http.post(this.endpoint, payload);
	}
}
