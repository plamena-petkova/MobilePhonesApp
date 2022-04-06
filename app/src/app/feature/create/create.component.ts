import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  @ViewChild('newPhoneForm') newPhoneForm! : NgForm;

  constructor(private phoneService: PhoneService, private router: Router) { }



  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  submitNewPhone(newPhoneForm: NgForm): void {
    this.phoneService.addPhone$(newPhoneForm.value).subscribe({
      next: (newPhoneForm) => {
        console.log(newPhoneForm);
        this.router.navigate(['/data'])
        
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }

  clearForm() : void {
    this.newPhoneForm.reset();
  
  }

}
