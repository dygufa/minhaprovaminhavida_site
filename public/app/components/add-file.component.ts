import { Component, OnInit } from 'angular2/core';
import { File } from '../models/file';
import { FileService } from '../services/file.service';
import { FORM_PROVIDERS, FormBuilder, Validators } from 'angular2/common';
import { Router } from 'angular2/router';

@Component({
	selector: 'add-file-form',
	templateUrl: './app/views/add-file.html',
	styleUrls: ['./assets/css/add-file']
})

export class AddFileComponent {
	userForm: any;

	fileRequired(control: Control) {
		if (typeof (control.value) != 'object') {
			return {
				validateFiles: {
					valid: false
				}
			};
		}
		return null
	}

	constructor(private _fileService: FileService, private _formBuilder: FormBuilder, private _router: Router) {
		
	}

	ngOnInit() {
		this.userForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'course': ['', Validators.compose([Validators.required])],
			'professor': ['', Validators.required],
			'files': ['', this.fileRequired]
		});
	}

	private addFile(data) {
		var _self = this;
		this._fileService.addFile(data).then(function(res) {
			_self.gotoFiles()
		});
	}

	fileChangeEvent(fileInput: any) {
        this.userForm.controls['files'].updateValue(fileInput.target.files);
    }
	
	onSubmit() { 
		this.addFile(this.userForm.value);
	}

	gotoFiles() {
		let link = ['Files'];
		this._router.navigate(link);
	}
}