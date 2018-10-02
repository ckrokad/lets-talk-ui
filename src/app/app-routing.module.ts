import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{
		path: 'login',
		component: SignupComponent,
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
