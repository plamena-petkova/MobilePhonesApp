import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
