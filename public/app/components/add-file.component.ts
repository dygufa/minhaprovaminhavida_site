import {Component, OnInit} from 'angular2/core';
import {File} from '../models/file';
import {FileService} from '../services/file.service';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';

@Component({
	selector: 'add-file-form',
	templateUrl: './app/views/add-file.html',
	styleUrls: ['./assets/css/add-file']
})

export class AddFileComponent {
	userForm: any;

	constructor(private _fileService: FileService, private _formBuilder: FormBuilder) {
		this.userForm = this._formBuilder.group({
			'name': ['aa', Validators.required],
			'course': ['bb', Validators.compose([Validators.required])],
			'professor': ['cc', Validators.required],
			'file': ['dd', Validators.required]
		});
	}

	private saveFile(data) {
		this._fileService.saveFile(data).subscribe(function(res) {
			console.log(res);
		});;
	}
	
	onSubmit() { 
		let data = JSON.stringify(this.userForm.value)
		console.log(data)
		this.saveFile(data)
	}
}