import { Component, OnInit } from '@angular/core';
import { selectOption } from '../models/selectOption';
import { FileService } from '../services/file.service';
import { UniversityService } from '../services/university.service';
import { CourseService } from '../services/course.service';
import { FORM_PROVIDERS, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Router } from '@angular/router-deprecated';

@Component({
	selector: 'add-file-form',
	templateUrl: './app/views/add-file.html',
	styleUrls: ['./assets/css/add-file']
})

export class AddFileComponent {
	userForm: any;
	universities: selectOption[] = [];
	courses: selectOption[] = [];

	fileRequired(/*control: Control*/) {
		/*if (typeof (control.value) != 'object') {
			return {
				validateFiles: {
					valid: false
				}
			};
		}*/
		return null
	}

	constructor(private _courseService: CourseService, private _universityService: UniversityService, private _fileService: FileService, private _formBuilder: FormBuilder, private _router: Router) {
		
	}

	ngOnInit() {
		let _self = this;

		this.userForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'course': [1, Validators.compose([Validators.required])],
			'university': [2, Validators.required],
			'files': ['', this.fileRequired],
		});

		this._universityService.getUniversities().subscribe(function(universities) {
			universities.forEach(function(university) {
				_self.universities.push({
					label: university.acronym + ' - ' + university.name,
					value: university.id
				});
			});			
		});	

		this._courseService.getCourses().subscribe(function(courses) {
			courses.forEach(function(course) {
				_self.courses.push({
					label: course.name,
					value: course.id
				});
			});
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