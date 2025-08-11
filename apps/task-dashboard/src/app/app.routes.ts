import { Route } from '@angular/router';
import { Login } from '../login/login';

export const appRoutes: Route[] = [
    { path: '', redirectTo: "login", pathMatch: 'full' },
    { path: 'login', component: Login }
];
