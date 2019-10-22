import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ElementsComponent } from './elements/elements.component';
import { AuthorizationGuard } from './_guards/authorization.guard';
import {Role} from './_models/role';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthorizationGuard],
    children: [
      {
        path: '', component: ElementsComponent,
        data: {
          allowedRoles: [Role.User]
        }
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
