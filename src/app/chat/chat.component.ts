import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

	messages;
	chat;
	constructor(private messageServ: MessageService, private route: ActivatedRoute) { }

	ngOnInit() {
		const that = this;
		this.route.params.subscribe(function(result){
			that.chat = JSON.parse(localStorage.getItem('chat_' + result['id']));
			this.messageServ.getMessages(result['id']);
		});
	}

}
