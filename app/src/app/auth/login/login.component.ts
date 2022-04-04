import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  errorMessage:string = '';

  @ViewChild('loginForm') loginForm! : NgForm;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
  }


  loginHandle(): void {
    console.log('The user is logged in!');
    this.errorMessage = '';
    this.authService.login$(this.loginForm.value).subscribe({
      next: user => {
        console.log(user);
        this.router.navigate(['/data']);
      },
      complete: () => {
        console.log('login stream completed')
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
  

  // clearForm() : void {
  //   this.loginForm.reset();
  // }


}
