import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MessageService {

	endpoint;

	constructor(private http: HttpClient) {
		this.endpoint = environment.apiEndpoints.message;
	}

	getMessages(id){
		return this.http.get(this.endpoint + id);
	}

	clearMessagesFromStorage() {
		for (let key in localStorage) {
			if (key.slice(0, 8) === 'messages') {
				localStorage.removeItem(key);
			}
		}
	}

	addMessageToStorage(message){
		const messages = JSON.parse(localStorage.getItem('messages_' + message.chat._id)) || [];
		console.log(messages);
		messages.push(message);
		messages.sort(function (a, b) {
			return new Date(a.sent_time) - new Date(b.sent_time);
		});
		localStorage.setItem('messages_' + message.chat._id, JSON.stringify(messages));
	}
}
