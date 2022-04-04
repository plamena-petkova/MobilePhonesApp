import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";


const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },
    {
        path: 'auth/profile',
        component: ProfileComponent
    }

]

export const AuthRoutingModule = RouterModule.forChild(routes);
    
