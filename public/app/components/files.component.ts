import { Component, OnInit, Input } from 'angular2/core';
import { File } from '../models/file';
import { FileService } from '../services/file.service'
import { UserService } from '../services/user.service'
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { Router } from 'angular2/router';

@Component({
	selector: 'my-files',
	templateUrl: './app/views/files.html',
	directives: [ROUTER_DIRECTIVES]
})

export class FilesComponent {
	authInfo;
	files: File[];

	constructor(private _fileService: FileService, private _userService: UserService, private _router: Router) { }

	getFiles() {
		this._fileService.getFiles()
			.subscribe(
			files => this.files = files);
	}

	ngOnInit() {
		let _self = this;

		this.getFiles();

		this.authInfo = this._userService.getCurrentAuthStatus();
		
		this._userService.authStatus$.subscribe(function(res) {
			_self.authInfo = res;
		});
	}

	removeFile(file) {
		var _self = this;
		
		this._fileService.removeFile(file.id)
			.subscribe(function(res) {
				console.log(res);
				var index = _self.files.indexOf(file);
				_self.files.splice(index, 1);
			});
	}

	gotoAddFile() {
		if (!this.authInfo || this.authInfo.logged == false) {
			alert('Você precisa estar logado!');
		} else {
			let link = ['AddFile'];
			this._router.navigate(link);
		}
	}
}