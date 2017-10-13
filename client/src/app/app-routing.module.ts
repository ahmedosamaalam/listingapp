import {Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import {DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const  myRoutes = RouterModule.forRoot([
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'register',
    component : RegisterComponent
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
