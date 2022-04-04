import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogCardComponent } from './catalog-card/catalog-card.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogComponent,
    CatalogCardComponent,
    DetailsComponent,
    CreateComponent,
    CommentsListComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    FormsModule
  ],
  exports: []
})
export class FeatureModule { }
