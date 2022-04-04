import { Component, Input, OnInit } from '@angular/core';
import { IPhone } from 'src/app/core/interfaces';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.css']
})
export class CatalogCardComponent implements OnInit {

  @Input('phone') phone!: IPhone

  constructor() { }

  ngOnInit(): void {
  
  }

}
