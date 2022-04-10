import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('registerForm') registerForm!: NgForm;

  
 
  constructor(private authService: AuthService, private router: Router) { }
  
  
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
   
  }


  registerHandle() : void {
    const {id, email, firstName, lastName, password} = this.registerForm.value;

    const body: IUser = {
      id:id,
      email: email,
      firstName: firstName,
      lastName:lastName,
      password: password
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/data']);
    })



  }

}
