import { Component, OnInit } from '@angular/core';

import { SocketService } from './services/socket.service';
import { AuthService } from './auth.service';

declare var M(): any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'lets-talk-ui';

	constructor(public auth: AuthService,
		private socketService: SocketService){
	}

	ngOnInit(): void {
		const that = this;
		this.auth.authCompletedEmitter$.addListener('authenticated', function(){
			that.initToConnection();
		});
	}

	private initToConnection(){
		// if(this.socketService.isConnected()){
			this.socketService.onMessage().subscribe(function(message){
				console.log(message);
			});
		// }
	}
}
