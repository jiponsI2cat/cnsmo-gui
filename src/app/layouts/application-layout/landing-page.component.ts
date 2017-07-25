import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  private loginForm: FormGroup;
  title = 'CNSMO WEB';
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

  login() {
    // test username and password: admin admin
    this.auth.login(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

}
