import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { environment } from '../../environments/environment';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var M(): any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	private user;

	constructor(private chatServ: ChatService,
		private profServ: ProfileService,
		private router: Router,
		private location: Location) { }

	ngOnInit() {

		M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));

		this.user = this.profServ.getSearchedUser();

		if (this.user.phoneNumber == JSON.parse(localStorage.getItem('user')).phoneNumber){
			document.getElementById('chat-button').style['display'] = 'none';
		}
		// console.log(this.user);

		M.Materialbox.init(document.querySelectorAll('.materialboxed'));
	}

	startChat(){
		const that = this;
		this.chatServ.createOrGetChat(this.user.profile._id).subscribe(function(result){
			if (JSON.parse(localStorage.getItem('user')).uid == result.user1.uid) {
				result.other = result.user2;
			}
			else {
				result.other = result.user1;
			}
			localStorage.setItem('chat_' + result._id, JSON.stringify(result));
			that.router.navigate(['chat', result._id]);
		});
	}

	getProfileImage(phoneNumber) {
		return environment.profileImageThumbUrl + phoneNumber.slice(3) + '?alt=media';
	}

	goBack(){
		this.location.back();
	}
}
