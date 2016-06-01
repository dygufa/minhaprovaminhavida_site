import { Component, OnInit } from '@angular/core';
import { FORM_PROVIDERS, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { CourseService } from '../services/course.service';

@Component({
	selector: 'add-course-form',
	templateUrl: './app/views/add-course-form.html',
})

export class AddCourseFormComponent {
	addCourseForm: any;

	ngOnInit() {
		let _self = this;

		this.addCourseForm = this._formBuilder.group({
			'name': ['', Validators.required],
			'university': [2, Validators.required],
		});
	}

	constructor(private _courseService: CourseService, private _formBuilder: FormBuilder) {

	}
}