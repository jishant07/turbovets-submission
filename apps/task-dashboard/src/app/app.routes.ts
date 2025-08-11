import { Route } from '@angular/router';
import { Login } from '../login/login';
import { Users } from '../users/users';
import { Organisations } from '../organisations/organisations';
import { Tasks } from '../tasks/tasks';
import { MainLayout } from '../layouts/main-layout/main-layout';
import { AuthGuard } from '../guards/auth.guard';
import { Forbidden } from '../forbidden/forbidden';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'forbidden', component: Forbidden }, 

  {
    path: '',
    component: MainLayout,
    canActivateChild: [AuthGuard],
    children: [
        { path: 'users', component: Users, data: { requiredRoles : ['superadmin', 'owner'] } },
        { path: 'organisations', component: Organisations, data: { requiredRoles : ['superadmin', 'owner'] }},
        { path: 'tasks', component: Tasks, data: { requiredRoles : ['admin', 'owner', 'viewer']}}
    ]
  }
];
