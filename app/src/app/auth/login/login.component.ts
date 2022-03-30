import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('loginForm') loginForm! : NgForm;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log();
  }


  loginHandle(): void {
    console.log('The user is logged in!')
  }

  clearForm() : void {
    this.loginForm.reset();
  }


}
