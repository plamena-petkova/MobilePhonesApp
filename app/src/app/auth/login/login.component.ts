import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  errorMessage: string = '';

  @ViewChild('loginForm') loginForm!: NgForm;


  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }


  loginHandle(): void {
    console.log('Loggin button clicked!');
    this.errorMessage = '';
    this.authService.login$(this.loginForm.value).subscribe({
      next: user => {
        console.log(user);
        // const newUser:any = user;
        // sessionStorage.setItem('authToken', newUser.accessToken)
        if (this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to'])
        } else {
          this.router.navigate(['/data']);
        }

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
