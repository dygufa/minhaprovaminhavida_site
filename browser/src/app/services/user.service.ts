import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class UserService {
    private APIEndpoint;
    currentAuthStatus = null;

    private authStatusSource = new Subject();
    authStatus$ = this.authStatusSource.asObservable();

    constructor(@Inject('Config') private _config, private http: Http) { 
        this.APIEndpoint = this._config.API_ENDPOINT;
    }

    verifyAuthStatus() {
        let _self = this;

        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let body = JSON.parse(xhr.response);

                        _self.currentAuthStatus = body.data;
                        _self.authStatusSource.next(body.data);
                
                        resolve(body.data);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.withCredentials = true;
            xhr.open("GET", this.APIEndpoint + '/users/isLogged', true);
            xhr.send(null);
        });
    }

    getCurrentAuthStatus() {
        return this.currentAuthStatus;
    }
}
