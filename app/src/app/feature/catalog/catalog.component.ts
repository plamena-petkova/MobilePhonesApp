import { Component, OnInit } from '@angular/core';
import { IPhone } from 'src/app/core/interfaces';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  phoneList!: IPhone[]

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.phoneService.loadPhoneList().subscribe( phoneList => {
      this.phoneList = phoneList;
    })
  }

}
