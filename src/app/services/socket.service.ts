import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import * as socketIO from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	private socket;

	initSocket(){
		if(!this.socket || !this.socket.connected){
			this.socket = socketIO(environment.socketUrl, {
				query: {
					user: localStorage.getItem('user')
				}
			});
		}
	}

	constructor() { }

	sendMessage(message){
		this.socket.emit('message', message);
	}

	onMessage(){
		const that = this;
		return new Observable(observer => {
			that.socket.on('message', (data) => observer.next(data));
		});
	}

	disconnect(){
		if(this.socket){
			this.socket.disconnect();
		}
	}

	isConnected(){
		if(this.socket){
			return true;
		}
		return false;
	}
}
