import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { FilesComponent } from './files.component';
import { AddFileComponent } from './add-file.component';
import { FileService } from '../services/file.service';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';

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
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS,
		FORM_PROVIDERS,
		FileService
	]
})

export class AppComponent {
	title = 'Minha prova, minha vida';
}