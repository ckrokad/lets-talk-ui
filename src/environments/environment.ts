// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiServer = 'http://192.168.1.114:8080/api/';

export const environment = {
	production: false,
	firebase: {
		apiKey: 'AIzaSyCe4CyXfvmYtMH-10EAnoMUmKJfSpKzWo8',
		authDomain: 'letstalk-eda9c.firebaseapp.com',
		databaseURL: 'https://letstalk-eda9c.firebaseio.com',
		projectId: 'letstalk-eda9c',
		storageBucket: 'letstalk-eda9c.appspot.com',
		messagingSenderId: '492879843047'
	},
	apiEndpoints: {
		profile: apiServer + 'profile/',
		chat: apiServer + 'chat/',
		message: apiServer + 'message/'
	},
	socketUrl: 'http://localhost:8080',
	profileImageThumbUrl: 'https://firebasestorage.googleapis.com/v0/b/letstalk-eda9c.appspot.com/o/profile%2Fthumb_%2B91',
	profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/letstalk-eda9c.appspot.com/o/profile%2F%2B91',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
