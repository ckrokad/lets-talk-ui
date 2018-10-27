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
		});

		that.socketService.onMessage().subscribe(function(message){
			that.messages = JSON.parse(localStorage.getItem('messages_' + that.chat._id));
		});
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

	sendMessage(messageText){
		if(messageText !== ''){
			console.log(messageText);
			console.log(new Date());
			const c = {
				user1: this.chat.user1,
				user2: this.chat.user2,
				_id: this.chat._id
			};
			const message = {
				from: this.user.profile,
				to: this.chat.other,
				chat: c,
				body: messageText,
				sent_time: new Date(),
				received_time: '',
				read_time: '',
				deleted: false,
			};
			this.socketService.sendMessage(message);
			document.getElementById("message-box").value = '';
			window.scrollBy(0, 20);
			// this.messageServ.addMessageToStorage(message);
			// console.log(message);
		}
	}
}
