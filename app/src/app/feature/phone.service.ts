import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { IPhone } from "../core/interfaces";
import { Observable } from "rxjs";




@Injectable()

export class PhoneService {

  portLink = 'https://mobile-phones-catalog.onrender.com/'

  constructor(private http: HttpClient) { }

  loadPhoneList$(): Observable<IPhone[]> {
    return this.http.get<IPhone[]>(`${this.portLink}/data`);
  }

 

  addPhone$(body: Observable<IPhone>) {
    return this.http.post<IPhone>(`${this.portLink}/data/create`, body, { withCredentials: true });
  }

  loadPhoneById$(id:string): Observable<IPhone> {
    return this.http.get<IPhone>(`${this.portLink}/data/details/${id}`)
  }

  deleteById$(id:string): Observable<IPhone> {
    return this.http.delete<IPhone>(`${this.portLink}/data/delete/${id}`)
  }

  editById$(body: IPhone,  id: string) {
    return this.http.put<IPhone>(`${this.portLink}/data/details/${id}`, body)
  }

  likes$(phoneId:string) {
    return this.http.get<number>(`${this.portLink}/data/details/${phoneId}/likes`)
  }
}