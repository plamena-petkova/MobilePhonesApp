import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces';
import { AuthService } from '../auth.service';
import { passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  // @ViewChild('registerForm') registerForm!: NgForm;

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(6)])

  registerFormGroup: FormGroup =  this.formBuilder.group({
    'firstName': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'lastName': new FormControl(null, [Validators.required, Validators.minLength(5)]),
		'email': new FormControl(null, [Validators.required, Validators.pattern('[a-z0-9]+@[a-z0-9]+\.[a-z]+')]),
		'passwords': new FormGroup({
		  'password' : this.passwordControl,
		  'confPass' : new FormControl(null, passwordMatch(this.passwordControl))
		})
	  })
	  
	  get passwordGroup(){
		return this.registerFormGroup.controls['passwords'] as FormGroup;
	  }

 
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  
  
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
   
  }


  registerHandle() : void { 

    const body: IUser = {
      _id:this.registerFormGroup.value.id,
      email: this.registerFormGroup.value.email,
      firstName: this.registerFormGroup.value.firstName,
      lastName:this.registerFormGroup.value.lastName,
      password: this.passwordGroup.value.password
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/data']);
    })



  }

}
