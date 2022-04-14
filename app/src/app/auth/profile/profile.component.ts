import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { AuthService } from '../auth.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  @ViewChild('editProfile') editProfile!: NgForm;


  currentUser!: IUser

  isInEditMode!: boolean

 

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {


    this.authService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
        
      },
      error: () => {
        this.router.navigate(['/login'])
      }
    })


  }


  editProfileButton(): void {
    this.isInEditMode = true;


    setTimeout(() => {
        
      this.editProfile?.form.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
      })
    })

    
  }


  saveProfileEdit(): void {

      const body: IUser = this.editProfile.value;
      const id: string = this.currentUser._id
     
      this.authService.editProfile$(id, body).subscribe((editedUser) => {
        this.currentUser = editedUser;
  
        
        this.isInEditMode = false;
          }); 

         
  }      
  

}
