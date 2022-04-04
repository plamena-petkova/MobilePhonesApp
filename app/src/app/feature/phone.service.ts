import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IPhone } from "../core/interfaces";
import { Observable } from "rxjs";



// const api = environment.apiUrl;
const body = { phoneName: String, phonePrice: Number, description: String, img: String, releaseDate: String };

@Injectable()

export class PhoneService {

  constructor(private http: HttpClient) { }

  loadPhoneList$(): Observable<IPhone[]> {
    return this.http.get<IPhone[]>(`http://localhost:3000/data`);
  }

 

  addPhone$(body: Observable<IPhone>) {
    return this.http.post<IPhone>(`http://localhost:3000/data/create`, body, { withCredentials: true });
  }

  loadPhoneById$(id:string): Observable<IPhone> {
    return this.http.get<IPhone>(`http://localhost:3000/data/details/${id}`)
  }

  deleteById$(id:string): Observable<IPhone> {
    return this.http.delete<IPhone>(`http://localhost:3000/data/details/${id}`)
  }
}