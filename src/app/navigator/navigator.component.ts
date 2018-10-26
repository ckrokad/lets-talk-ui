import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { SocketService } from '../services/socket.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

declare var M(): any;

@Component({
	selector: 'app-navigator',
	templateUrl: './navigator.component.html',
	styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

	public search;

	constructor(private afAuth: AngularFireAuth,
		private auth: AuthService,
		private profServ: ProfileService,
		private router: Router) { }

	ngOnInit() {
		M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));

		M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: true });
	}

	logout() {
		this.auth.logout();
	}

	doSearch(){
		const that = this;
		var val = document.querySelector('#search').value;
		if(/^\d{10}$/.test(val)){
			this.profServ.getProfileByPhoneNumber(val).subscribe(function(result){
				if(result.phoneNumber === '+91' + val){
					that.profServ.changeSearchedUser(result);
					that.router.navigate(['profile']);
				}
			});
		}
	}

	showMyProfile(){
		this.profServ.changeSearchedUser(JSON.parse(localStorage.getItem('user')));
		this.router.navigate(['profile']);
	}
}
