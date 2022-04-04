import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../core/interfaces";

@Injectable()

export class AuthService {
    
    constructor(private http: HttpClient) {}

    register$(userData: IUser): Observable<IUser> {
        return this.http.post<IUser>(`http://localhost:3000/auth/register`, userData, { withCredentials: true })
      }

}

