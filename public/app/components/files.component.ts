import { Component, OnInit } from 'angular2/core';
import { File } from '../models/file';
import { FileService } from '../services/file.service'
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'my-files',
	templateUrl: './app/views/files.html',
	directives: [ROUTER_DIRECTIVES]
})

export class FilesComponent {
	files: File[];
	constructor(private _fileService: FileService) { }
	getFiles() {
		this._fileService.getFiles()
			.subscribe(
			files => this.files = files);
	}
	ngOnInit() {
		this.getFiles();
	}
}