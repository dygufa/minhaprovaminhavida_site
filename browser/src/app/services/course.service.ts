import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class CourseService {
    private APIEndpoint;
    private fieldsOfStudy = [{ id: 1, name: 'Exatas'}, { id: 2, name: 'Humanas'}];

    constructor(@Inject('Config') private _config, private http: Http) { 
        this.APIEndpoint = this._config.API_ENDPOINT;
    }

	getCourses(): Observable<any[]> {
        return this.http.get(this.APIEndpoint + '/courses')
            .map(this.extractData);
	}

	getFieldsOfStudy(): Array<Object> {
		return this.fieldsOfStudy;
	}
	
	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.data || {};
	}
}
