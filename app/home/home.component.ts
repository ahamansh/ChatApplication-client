import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User,MinimalProfile,Name } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: MinimalProfile;
    users: MinimalProfile[] = [];

    constructor(private userService: UserService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.logUserOnServer();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    logout(){
        this.userService.logoutUser().subscribe(auth => {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
            });

    }

    private logUserOnServer(){

        this.userService.logUser().subscribe(auth => {console.log("response is")+auth})

    }
}