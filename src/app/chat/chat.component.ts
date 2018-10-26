import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { Location } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { environment } from '../../environments/environment';
import { SocketService } from '../services/socket.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messages;
	chat;
	user;
	constructor(private messageServ: MessageService,
		private route: ActivatedRoute,
		private location: Location,
		private profServ: ProfileService,
		private router: Router,
		private socketService: SocketService) { }

	ngOnInit() {
		const that = this;
		this.user = JSON.parse(localStorage.getItem('user'));
		this.route.params.subscribe(function(result){
			that.chat = JSON.parse(localStorage.getItem('chat_' + result['id']));
			that.messageServ.getMessages(result['id']).subscribe(function(messages){
				console.log(messages);
				that.messages = messages;
			});
		});

		// this.socketService.initSocket();
	}

	goBack(){
		this.location.back();
	}

	showProfile(){
		const user = this.chat.other;
		user['profile'] = {
			status: this.chat.other.status,
			_id: this.chat.other._id
		};
		this.profServ.changeSearchedUser(user);
		this.router.navigate(['profile']);
	}

	getProfileImage(phoneNumber) {
		return environment.profileImageThumbUrl + phoneNumber.slice(3) + '?alt=media';
	}
}
