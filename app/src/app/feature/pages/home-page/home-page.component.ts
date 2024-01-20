import { Component, Input, OnInit } from '@angular/core';
import { IPhone } from 'src/app/core/interfaces';
import { PhoneService } from '../../phone.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

}
