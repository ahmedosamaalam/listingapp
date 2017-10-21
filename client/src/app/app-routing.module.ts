import {Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './services/gaurds/auth-guard.service';
import { NotAuthGuard } from './services/gaurds/not-auth-guard.service';

const  myRoutes = RouterModule.forRoot([
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'register',
    component : RegisterComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent
  }
]);


@NgModule({
  declarations: [HomeComponent],
  imports: [ myRoutes ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModules { }
