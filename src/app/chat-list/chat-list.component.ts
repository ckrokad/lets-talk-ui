import { Component, OnInit } from '@angular/core';

declare var M(): any;

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	ohYeah() {
		console.log("Oh yeah");
	}
}
