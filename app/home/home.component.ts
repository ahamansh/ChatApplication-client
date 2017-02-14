import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, MinimalProfile, Name } from '../_models/index';
import { UserService, AuthenticationService, StompService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: MinimalProfile;
    users: MinimalProfile[] = [];
    public serverResponse: string;

    constructor(private userService: UserService, private router: Router,private _stompService: StompService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.logUserOnServer();
        this._stompService.connect('ws://localhost:8080/app/stompTest/websocket');
        this._stompService.getObservable().subscribe(payload => {
            this.serverResponse = payload.outputField;
        });
    }

    sendMessageToServer(){

        var texttosend = '{ ansh, hi}';
        this._stompService.send(texttosend);
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    logout() {
        this.userService.logoutUser().subscribe(auth => {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
        });

    }

    private logUserOnServer() {

        this.userService.logUser().subscribe(auth => { console.log("response is") + auth })

    }
}