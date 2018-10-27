import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from '../services/profile.service'
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { AuthService } from '../auth.service';

declare var M(): any;

@Component({
	selector: 'app-one-time',
	templateUrl: './one-time.component.html',
	styleUrls: ['./one-time.component.css']
})
export class OneTimeComponent implements OnInit {

	constructor(private storage: AngularFireStorage,
		private profile: ProfileService,
		private router: Router,
		private auth: AuthService) { }

	ngOnInit() {
		var elems = document.querySelectorAll('.materialboxed');
		M.Materialbox.init(elems);
	}

	update() {
		const reader = new FileReader();
		const show = document.querySelector('#profile_image_show');
		const image = document.querySelector('#profile_image').files[0];

		reader.onload = function(e) {
			show.src = reader.result;
		}

		if(image){
			document.querySelector('#profile_image_show').style.display = 'block';
			reader.readAsDataURL(image);
		}
	}

	async save(data){
		// console.log(data);
		const user = firebase.auth().currentUser;
		const path = 'profile/' + user.phoneNumber;
		const storageRef = this.storage.ref(path);
		const image = document.querySelector('#profile_image').files[0];
		storageRef.put(image);
		// const profileUrl = await storageRef.getDownloadURL().toPromise();
		// console.log(profileUrl);

		user.updateProfile({
			displayName: data.display_name,
			photoURL: ''
		}).then(function(){
			console.log('updated');
			// console.log(user);
		});
		const that = this;
		this.profile.changeStatus(data.status, user.uid, user.phoneNumber, data.display_name).subscribe(function(result){
			console.log(result);
			that.profile.getProfileByUid(user.uid).subscribe(function(res){
				localStorage.setItem('user', JSON.stringify(res));
				that.auth.authComplete();
				that.router.navigate(['/']);
			});
		});

		// this.profile.getProfile(user.uid).subscribe(function(result){
		// 	console.log(result);
		// });
	}
}
