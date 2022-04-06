import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  private isLoggingdOut: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logoutHandler(): void {
    

    if(this.isLoggingdOut) {
      return;
    } 

    this.isLoggingdOut = true;
    console.log('Logout called');

    this.authService.logout$().subscribe({
      complete: () => {
      this.isLoggingdOut = false;
      this.router.navigate(['/data'])
      },
      error: () => {
        this.isLoggingdOut = false;
      }
    });
  }

}
