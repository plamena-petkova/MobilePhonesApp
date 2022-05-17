import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {



  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree  {

    if(this.authService.isLogged) {
      return true;
    } 
     
    return this.router.createUrlTree(['/auth/login'])
    }
  
}

