import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    _url = "http://localhost:8080"

    constructor(private http: Http) { }

    getAll() {


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( {withCredentials: true,  headers: headers });

        return this.http.get(this._url+'/api/users', options)
                .map(
                        (response: Response) => { let user = response.json();
                                            console.log(user); return user;});
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( {withCredentials: true,  headers: headers });


        return this.http.post(this._url+'/register', user, options ).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    logUser(){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( {withCredentials: true,  headers: headers });

        return this.http.get(this._url+'/api/loguser', options)
                .map(
                        (response: Response) => { let user = response.json();
                                            console.log(user); return user;});

    }


    logoutUser(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( {withCredentials: true,  headers: headers });

        return this.http.get(this._url+'/api/remove', options)
                .map(
                        (response: Response) => { let user = response.json();
                                            console.log(user); return user;});

    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}