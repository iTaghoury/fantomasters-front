import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditRolePageComponent } from './edit-role-page/edit-role-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutPageComponent, pathMatch: 'full' },
  { path: 'sign-up', component: SignUpPageComponent, pathMatch: 'full'},
  { path: 'user/:id/edit-role', component: EditRolePageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
