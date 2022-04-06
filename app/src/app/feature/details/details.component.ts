import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  isInEditMode: boolean = false;

  constructor(private phoneService:PhoneService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      this.phoneService.loadPhoneById$(phoneId).subscribe(phone => {
        this.phone = phone;
        // this.canSubscribe = !this.phone.subscribers.includes('5fa64b162183ce1728ff371d');
      });
    })
  }

  deletePhone() {
    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      this.phoneService.deleteById$(phoneId).subscribe(() => {
        this.router.navigate(['/data']);
          });
      });

    
      
    }


    editPhone() {
      this.isInEditMode = true;
    }

    updatePhone() {
      console.log('The update is hit')
    }
}  
  