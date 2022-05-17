import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PhoneService } from '../phone.service';
import { FeatureModule } from '../feature.module';
import { CatalogComponent } from '../catalog/catalog.component';
import { HomeCardComponent } from './home-card/home-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomePageComponent,
    PageNotFoundComponent,
    HomeCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomePageComponent,
    PageNotFoundComponent
  ],
  providers: [PhoneService]
})
export class PagesModule { }
