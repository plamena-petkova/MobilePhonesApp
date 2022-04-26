import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs"
import { map } from "rxjs/operators";
import { IUser } from "../core/interfaces";

@Injectable({providedIn: 'root'})

export class AuthService {

  private _currentUser = new BehaviorSubject<IUser>(undefined!);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user => !!user));
 
  isLogged: boolean = false;
  newUser!: IUser

  portLink = 'https://mobilephones-app.herokuapp.com'
    
    constructor(private http: HttpClient) {}



    register$(userData: IUser): Observable<IUser> {
        return this.http.post<IUser>(`${this.portLink}/auth/register`, userData, { withCredentials: true })
      }
  
    login$(userData: { email: string, password: string }): Observable<IUser> {
      return this.http
        .post<IUser>(`${this.portLink}/auth/login`, userData, { withCredentials: true, observe: 'response' })
        .pipe(
          map(response => response.body!)
        )
    }

    logout$(): Observable<void> {
      return this.http
      .post<void>(`${this.portLink}/auth/logout`, {}, { withCredentials: true })
    }

    handleLogin(newUser: IUser) {
      if (this._currentUser == undefined) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
        this._currentUser.next(newUser);
      }
    }
  
    handleLogout() {
      this._currentUser.next(undefined!);
      this.isLogged = false;
    }

    getProfile$(): Observable<any> {
      return this.http.get(`${this.portLink}/auth/profile`)
    }

    editProfile$( id: string, body: Observable<IUser>) : Observable<any> {
      return this.http.put(`${this.portLink}/auth/profile/${id}`, body);
    }



}

