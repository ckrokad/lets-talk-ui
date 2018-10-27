import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

declare var M(): any;

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
	chats;
	constructor(private chatServ: ChatService, private router: Router) { }

	ngOnInit() {
		const that = this;
		this.clearChatsFromStorage();
		this.chatServ.getAllChats().subscribe(function (result) {
			const user = JSON.parse(localStorage.getItem('user'));
			for(let i=0 ; i<result.length ; i++){
				if(user.uid == result[i].user1.uid){
					result[i].other = result[i].user2;
				}
				else{
					result[i].other = result[i].user1;
				}
				localStorage.setItem('chat_' + result[i]._id, JSON.stringify(result[i]));
			}
			that.chats = that.getChatsFromStorage();
		});
	}

	getProfileImage(phoneNumber){
		return environment.profileImageThumbUrl + phoneNumber.slice(3) + '?alt=media';
	}

	getChatsFromStorage(){
		let result = [];
		for(let key in localStorage){
			if(key.slice(0,4) === 'chat'){
				result.push(JSON.parse(localStorage.getItem(key)));
			}
		}
		return result;
	}

	clearChatsFromStorage(){
		for (let key in localStorage) {
			if (key.slice(0, 4) === 'chat') {
				localStorage.removeItem(key);
			}
		}
	}

	openChat(user){
		this.router.navigate(['chat', user._id]);
	}
}
