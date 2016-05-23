import { Component, OnInit, Input, Inject } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { UserService } from '../services/user.service';

@Component({
	selector: 'my-login',
	templateUrl: './app/views/login.html',
	directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent {
	private APIEndpoint;
	authInfo = {};

	constructor(@Inject('Config') private _config, private _userService: UserService) { }

	ngOnInit() {
		let _self = this;
		this._userService.verifyAuthStatus()
			.then(function(res) {
				_self.authInfo = res;
				console.log(_self.authInfo);
			})

		this.APIEndpoint = this._config.API_ENDPOINT;
	}

	redirectLoginFacebook(event) {
		window.location.href = this.APIEndpoint + '/users/login/facebook';
	}
}