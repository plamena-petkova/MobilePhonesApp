import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IPhone, IUser } from 'src/app/core/interfaces';
import { PhoneService } from '../phone.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  phone!:IPhone
  editedPhone!: IPhone
  _id!: string
  
  @ViewChild('editForm') editForm!: NgForm;

  isInEditMode: boolean = false;
  private _currentUser = new BehaviorSubject<IUser>(undefined!);
  

  isOwner: boolean = false;



  constructor(private phoneService:PhoneService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      this.phoneService.loadPhoneById$(phoneId).subscribe(phone => {
        this.phone = phone;
      });
    });

    // this._currentUser.subscribe(id => {
    //   this._id = id
    // })

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


      setTimeout(() => {
        
        this.editForm.form.patchValue({
          phoneName: this.phone.phoneName,
          phonePrice: this.phone.phonePrice,
          description: this.phone.description,
          releaseDate: this.phone.releaseDate,
          img: this.phone.img
        })
      })
    }

    updatePhone(): void {
      this.isInEditMode = false;

      this.activatedRoute.params.subscribe(params => {
        const phoneId = params['phoneId'];

      const body: Observable<IPhone> = this.editForm.value;
      
        
        this.phoneService.editById$(body, phoneId).subscribe((editedPhone) => {
          this.phone = editedPhone;
            });
        });


    }
}  
  