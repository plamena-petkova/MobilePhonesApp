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

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  constructor(private authService: AuthService, private router: Router) { }

  

  ngOnInit(): void {


      //  const userId = this.currentUser$;

  //   this.authService.getProfile$().subscribe({
  //     next: (userId) => {
  //       this.currentUser$ = userId;
  //     },
  //     error: () => {
  //       this.router.navigate(['/login'])
  //     }
  //   })
  }

}
