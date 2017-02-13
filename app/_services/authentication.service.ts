import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    _url = "http://localhost:8080";

    constructor(private http: Http) { }

    login(username: string, password: string) {
        console.log("Inside login service");

        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ withCredentials: true, headers: headers });



        return this.http.post(this._url + '/login',
            body, options
        )
            .map((response: Response) => {
                // login successful jwt token will be stored in cookie from the response
                let user = response.json();
                if (user) {
                    // store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        console.log("Inside logout service - Removing user from local storage");
        localStorage.removeItem('currentUser');
        /*let body = JSON.stringify({ username: "username", password: "password" });*/
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ withCredentials: true, headers: headers });

        return this.http.get(this._url + "/api/remove")
            .map((response: Response) => {
                console.log("logging off");
                let authResponse = response.json();
                console.log("authResponse");
                return authResponse;

            })
            

        
        
    }
}