import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateComponent } from "./create/create.component";
import { DetailsComponent } from "./details/details.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: CreateComponent
    },
    {
        path: 'details/:phoneId',
        component: DetailsComponent
    },
    {
        path: 'edit/:phoneId',
        component: DetailsComponent
    },
    {
        path: 'delete/:phoneId',
        component: DetailsComponent
    }
   
]


export const CatalogRoutingModule = RouterModule.forChild(routes)