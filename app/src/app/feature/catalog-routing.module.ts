import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateComponent } from "./create/create.component";
import { DetailsComponent } from "./details/details.component";


const routes: Routes = [
    {
        path: 'data',
        component: CatalogComponent
    },
    {
        path: 'data/create',
        component: CreateComponent
    },
    {
        path: 'data/details/:phoneId',
        component: DetailsComponent
    }
   
]


export const CatalogRoutingModule = RouterModule.forChild(routes)