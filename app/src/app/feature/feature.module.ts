import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';




@NgModule({
  declarations: [
    CatalogComponent,
    CatalogCardComponent,
    DetailsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule,
    PagesModule
  ],
  exports: []
})
export class FeatureModule { }
