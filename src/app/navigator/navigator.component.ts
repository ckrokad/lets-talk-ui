import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

declare var M(): any;

@Component({
	selector: 'app-navigator',
	templateUrl: './navigator.component.html',
	styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

	constructor(private afAuth: AngularFireAuth, private auth: AuthService) { }

	ngOnInit() {
		var elems = document.querySelectorAll('.dropdown-trigger');
		M.Dropdown.init(elems);

		elems = document.querySelectorAll('.fixed-action-btn');
		M.FloatingActionButton.init(elems, { direction: 'left' });

		M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: true });
	}

	logout() {
		this.auth.logout();
	}
}
