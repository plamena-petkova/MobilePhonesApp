import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // currentUser$: Observable<IUser> = this.authService.currentUser$;
  // isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  currentUser!: IUser

  constructor(private authService: AuthService, private router: Router) { }

  

  ngOnInit(): void {

    this.authService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })
  }

}
