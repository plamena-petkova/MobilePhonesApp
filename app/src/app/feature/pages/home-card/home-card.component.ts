import { Component, Input, OnInit } from '@angular/core';
import { IPhone } from 'src/app/core/interfaces';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input('phone') phone!: IPhone;

  constructor() { }

  ngOnInit(): void {
  }

}
