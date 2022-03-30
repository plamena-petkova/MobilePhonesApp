import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('registerForm') registerForm!: NgForm;
  @ViewChild('passData') passData! : NgModel
 
  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
   
  }


  registerHandle() : void {
    console.log(this.passData)
  }

}
