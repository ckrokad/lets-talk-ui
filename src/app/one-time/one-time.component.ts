import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from '../services/profile.service'
import { Router } from '@angular/router';

import * as firebase from 'firebase';

declare var M(): any;

@Component({
	selector: 'app-one-time',
	templateUrl: './one-time.component.html',
	styleUrls: ['./one-time.component.css']
})
export class OneTimeComponent implements OnInit {

	constructor(private storage: AngularFireStorage,
		private profile: ProfileService,
		private router: Router) { }

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
		const profileUrl = await storageRef.getDownloadURL().toPromise();
		// console.log(profileUrl);

		user.updateProfile({
			displayName: data.display_name,
			photoURL: profileUrl
		}).then(function(){
			console.log('updated');
			// console.log(user);
		});

		this.profile.changeStatus(data.status, user.uid).subscribe(function(result){
			console.log(result);
		});

		this.router.navigate(['/'];)

		// this.profile.getProfile(user.uid).subscribe(function(result){
		// 	console.log(result);
		// });
	}
}
