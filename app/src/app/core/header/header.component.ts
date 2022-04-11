import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  private isLoggingdOut: boolean = false;

  message!: string;
  isMessageError!: boolean



  private subscription!: Subscription

  constructor(private authService: AuthService, 
              private router: Router, 
              private messageBus: MessageBusService) { }


  ngOnInit(): void {

    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      this.message = newMessage?.text || "";
      this.isMessageError = newMessage?.type === MessageType.Error;


      if(this.message) {
        setTimeout(() => {
          this.messageBus.clear()
        }, 5000);
      }
    });
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {
    

    if(this.isLoggingdOut) {
      return;
    } 

    this.isLoggingdOut = true;
    console.log('Logout called');

    this.authService.logout$().subscribe({
      complete: () => {
      this.isLoggingdOut = false;
      this.router.navigate(['/data'])
      },
      error: () => {
        this.isLoggingdOut = false;
      }
    });
  }

}
