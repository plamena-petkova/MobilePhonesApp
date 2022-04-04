import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable} from "rxjs"
import { map, tap } from "rxjs/operators";
import { IUser } from "../core/interfaces";

@Injectable()

export class AuthService {

  currentUser!:IUser
    
    constructor(private http: HttpClient) {}

    register$(userData: IUser): Observable<IUser> {
        return this.http.post<IUser>(`http://localhost:3000/auth/register`, userData, { withCredentials: true })
      }
  
    login$(userData: { email: string, password: string }): Observable<IUser> {
      return this.http
        .post<IUser>(`http://localhost:3000/auth/login`, userData, { withCredentials: true, observe: 'response' })
        .pipe(
          tap(response => console.log(response)),
          map(response => response.body!),
          tap(user => this.currentUser = user)
        )
    }

    logout(): void {
      
    }

}

