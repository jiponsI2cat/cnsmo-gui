import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../core/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        // private notification: NotificationService,
        public auth: AuthService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onLoggedin() {
    }

    login() {
        // test username and password: admin admin
        this.auth.login(this.loginForm.value).subscribe(() => {
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/']);
        });
    }
}







