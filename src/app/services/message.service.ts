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
}
