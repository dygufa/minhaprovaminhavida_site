import { Component, OnInit, Inject } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { FilesComponent } from './files.component';
import { AddFileComponent } from './add-file.component';
import { LoginComponent } from './login.component';
import { FileService } from '../services/file.service';
import { UniversityService } from '../services/university.service';
import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import {FORM_PROVIDERS, FormBuilder, Validators} from '@angular/common';

@RouteConfig([
	{
		path: '/arquivos',
		name: 'Files',
		component: FilesComponent,
		useAsDefault: true
	},
	{
		path: '/adicionar',
		name: 'AddFile',
		component: AddFileComponent
	}
])

@Component({
	selector: 'my-app',
	templateUrl: './app/views/app.html',
	directives: [ROUTER_DIRECTIVES, LoginComponent],
	providers: [
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS,
		FORM_PROVIDERS,
		FileService,
		UserService,
		UniversityService,
		CourseService
	]
})

export class AppComponent {
	title = 'Minha prova, minha vida!!';
}