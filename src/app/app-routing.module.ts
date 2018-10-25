import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuard } from './auth.guard';
import { OneTimeComponent } from './one-time/one-time.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
	{
		path: 'onetimedetails',
		component: OneTimeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		component: SignupComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'chat/:id',
		component: ChatComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		component:  NavigatorComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
