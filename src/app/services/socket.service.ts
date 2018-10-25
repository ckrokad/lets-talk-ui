import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as socketIO from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket;

	public initSocket(): void{
		if(!this.socket || !this.socket.connected){
			this.socket = socketIO(environment.socketUrl, {
				query: {
					user: JSON.parse(localStorage.getItem('user')).uid
				}
			});
		}
	}

	constructor() { }
}
