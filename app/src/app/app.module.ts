import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';
import { PhoneService } from './feature/phone.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    FeatureModule,
    HttpClientModule
  ],
  providers: [PhoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
