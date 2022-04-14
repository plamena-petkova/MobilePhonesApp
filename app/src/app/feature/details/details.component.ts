import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  
  @ViewChild('editForm') editForm!: NgForm;

  isInEditMode: boolean = false;
  user!: IUser
  isOwner: boolean = false;
  isAuthor: boolean = false;
  userId!: string;
  rating!: number
  isLiked:boolean = false;
  

  constructor(private phoneService:PhoneService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit(): void {

   
    console.log(this.rating);

    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      this.phoneService.loadPhoneById$(phoneId).subscribe(phone => {
        this.phone = phone;

        if(this.authService.isLogged) {
          this.authService.getProfile$().subscribe({
            next: (user) => {
              this.user = user;
              if(this.phone.owner === user._id) {
                this.isOwner = true;
              };
              if(this.phone.owner !== user._id) {
                this.isAuthor = true;
              };
              if(phone.likes) {
                if(this.phone.likes.includes(this.user._id)) {
                  this.isLiked = true;
              }
          
              }
            },
            error: () => {
              this.router.navigate(['/login'])
            }
          })
        }
      });
    });

  }

  deletePhone() {
    if(confirm('Are you sure you want to delete this item?')){
    this.activatedRoute.params.subscribe(params => {
      const phoneId = params['phoneId'];
      this.phoneService.deleteById$(phoneId).subscribe(() => {
        this.router.navigate(['/data']);
          });
      });
    }
  }


    editPhone() {
      this.isInEditMode = true;


      setTimeout(() => {
        
        this.editForm?.form.patchValue({
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

    getLikes(): void {

        this.activatedRoute.params.subscribe(params => {
          const phoneId = params['phoneId'];
  
          this.authService.getProfile$().subscribe({
            next: (userId) => {
              this.userId = userId;
            }
          });

          this.phoneService.likes$(phoneId).subscribe(rating => {
              this.rating = rating;
                 this.router.navigate([`data/details/${phoneId}`])
              this.isLiked = true;
            });
        });

      }
  

}
  