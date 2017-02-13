import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Component({

    selector: 'logout',
    template:  `<a (click)="logout()">Logout</a>`
})
export class LogoutComponent implements OnInit{

    constructor(private authService: AuthenticationService,private router: Router){}


    ngOnInit(){

        //this.authService.logout();
        //console.log("Logout Component called")
        //this.router.navigate(['/login']);
    }

    logout(){
        //console.log("Logout method in logout Component");
        this.authService.logout()
                .subscribe(
                data => {
                    localStorage.removeItem('currentUser');
                    this.router.navigate(['']);
                },
                error => {
                    console.log(error);
                });
        //this.router.navigate(['/login']);
    }



}