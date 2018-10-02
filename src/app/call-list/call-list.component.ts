import { Component, OnInit } from '@angular/core';

declare var M():any;

@Component({
	selector: 'app-call-list',
	templateUrl: './call-list.component.html',
	styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	ohYeah(){
		console.log("Oh yeah");
	}
}
