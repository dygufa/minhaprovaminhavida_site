import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {File} from '../models/file';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class FileService {
	constructor(private http: Http) { }

	getFiles(): Observable<File[]> {
		return this.http.get('/files')
			.map(this.extractData)
			.catch(this.handleError);
	}

	saveFile(data) {
		let body = data;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post('/files', body, options)
			.map(res => res.json());
	}
	
	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.files || {};
	}

	private handleError(error: any) {
	}
}
