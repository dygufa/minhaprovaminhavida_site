import { Component, OnInit, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { UserService } from '../services/user.service';

@Component({
	selector: 'my-login',
	templateUrl: './app/views/login.html',
	directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
	authInfo = false;

	constructor(private _userService: UserService) { }

	ngOnInit() {
		let _self = this;
		this._userService.verifyAuthStatus()
			.subscribe(function(res) {
				_self.authInfo = res;
			})
	}
}