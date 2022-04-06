import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs"
import { map } from "rxjs/operators";
import { IUser } from "../core/interfaces";

@Injectable({providedIn: 'root'})

export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user))


  // currentUser!:IUser
    
    constructor(private http: HttpClient) {}

    register$(userData: IUser): Observable<IUser> {
        return this.http.post<IUser>(`http://localhost:3000/auth/register`, userData, { withCredentials: true })
      }
  
    login$(userData: { email: string, password: string }): Observable<IUser> {
      return this.http
        .post<IUser>(`http://localhost:3000/auth/login`, userData, { withCredentials: true, observe: 'response' })
        .pipe(
          // // tap(response => console.log(response)),
          map(response => response.body!)
          // tap(user => this.currentUser = user)
        )
        
    }

    logout$(): Observable<void> {
      return this.http
      .post<void>(`http://localhost:3000/auth/logout`, {}, { withCredentials: true })
    }

    handleLogin(newUser: IUser) {
      this._currentUser.next(newUser);
      console.log('New User', newUser);
    }
  
    handleLogout() {
      this._currentUser.next(undefined!);
    }

}

