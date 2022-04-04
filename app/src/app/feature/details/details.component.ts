import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhone } from 'src/app/core/interfaces';
import { PhoneService } from '../phone.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  phone!:IPhone

  constructor(private phoneService:PhoneService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      console.log(phoneId);
      this.phoneService.loadPhoneById$(phoneId).subscribe(phone => {
        this.phone = phone;
        // this.canSubscribe = !this.phone.subscribers.includes('5fa64b162183ce1728ff371d');
      });
    })
  }

}
