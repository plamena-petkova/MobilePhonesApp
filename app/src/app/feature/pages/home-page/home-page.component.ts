import { Component, Input, OnInit } from '@angular/core';
import { IPhone } from 'src/app/core/interfaces';
import { PhoneService } from '../../phone.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @Input('catalog') catalogHome :IPhone[] | undefined;
  
  
  
  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneService.loadPhoneList$().subscribe(phoneList =>{
      this.catalogHome = phoneList;
  
    });


  }

}
