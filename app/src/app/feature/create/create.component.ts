import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private phoneService: PhoneService, private router: Router) { }

  ngOnInit(): void {
    
  }

  submitNewPhone(newPhoneForm: NgForm): void {
    console.log(newPhoneForm.value);
    this.phoneService.addPhone$(newPhoneForm.value).subscribe({
      next: (phone) => {
        console.log(phone);
        this.router.navigate(['/catalog'])
        
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  // navigateToHome() {
  //   this.router.navigate(['/home']);
  // }

}
