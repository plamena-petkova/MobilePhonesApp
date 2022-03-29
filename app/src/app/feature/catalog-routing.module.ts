import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateComponent } from "./create/create.component";
import { DetailsComponent } from "./details/details.component";


const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'catalog/create',
        component: CreateComponent
    },
    {
        path: 'catalog/:phoneId',
        component: DetailsComponent
    }
   
]


export const CatalogRoutingModule = RouterModule.forChild(routes)