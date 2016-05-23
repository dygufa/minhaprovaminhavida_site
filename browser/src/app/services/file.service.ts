import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {File} from '../models/file';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class FileService {
    private APIEndpoint;

    constructor(@Inject('Config') private _config, private http: Http) { 
        this.APIEndpoint = this._config.API_ENDPOINT;
    }

	getFiles(): Observable<File[]> {
        return this.http.get(this.APIEndpoint + '/files')
            .map(this.extractData);
	}

    addFile(params: Array<any>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for (let param_name in params) {
            	if (param_name == 'files') {
					for (var i = 0; i < params[param_name].length; i++) {
						formData.append("uploads[]", params[param_name][i], params[param_name][i].name);
					}
            	} else {
					formData.append(param_name, params[param_name]);
            	}                
            }
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", this.APIEndpoint + '/files', true);
            xhr.send(formData);
        });
    }

    removeFile(fileID) {
        return this.http.delete(this.APIEndpoint + '/files/' + fileID).map(this.extractData)
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
