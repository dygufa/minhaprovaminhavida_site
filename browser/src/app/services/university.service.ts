import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class UniversityService {
    private APIEndpoint;

    constructor(@Inject('Config') private _config, private http: Http) { 
        this.APIEndpoint = this._config.API_ENDPOINT;
    }

	getUniversities(): Observable<any[]> {
        return this.http.get(this.APIEndpoint + '/universities')
            .map(this.extractData);
	}
	
	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.data || {};
	}

	private handleError(error: any) {
	}
}
