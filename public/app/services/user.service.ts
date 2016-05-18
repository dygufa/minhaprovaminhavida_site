import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class UserService {
    currentAuthStatus = null;

    private authStatusSource = new Subject();
    authStatus$ = this.authStatusSource.asObservable();

    constructor(private http: Http) { }

    verifyAuthStatus() {
        let _self = this;
        return this.http.get('/users/isLogged')
            .map(function(res) {
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('Bad response status: ' + res.status);
                }
                
                let body = res.json();

                _self.currentAuthStatus = body.data;                
                _self.authStatusSource.next(body.data);

                return body.data || {};
            });
    }

    getCurrentAuthStatus() {
        return this.currentAuthStatus;
    }
}
