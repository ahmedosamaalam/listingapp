import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogComponent } from './components/blog/blog.component';
import { AuthGuard } from './services/gaurds/auth-guard.service';
import { NotAuthGuard } from './services/gaurds/not-auth-guard.service';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { ActivateComponent } from "./components/activate/activate.component";
import { ForgotpasswordComponent } from "./components/forgotpassword/forgotpassword.component";
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from "./components/product/product.component";
import { ServiceComponent} from "./components/service/service.component";
import { EditCategoryComponent} from "./components/category/edit-category/edit-category.component";
import { EditProductComponent} from "./components/product/edit-product/edit-product.component";
import { EditServiceComponent} from "./components/service/edit-service/edit-service.component";
import { ItemsComponent } from "./components/public/items/items.component";
import { PublicProductComponent} from "./components/public/public-product/public-product.component";
import { PublicServiceComponent} from "./components/public/public-service/public-service.component";
import { PProductComponent} from "./components/public/public-product/product/product.component";
import { PServiceComponent} from "./components/public/public-service/service/service.component";

const  myRoutes = RouterModule.forRoot([
  {
    path: 'home',
    component: HomeComponent,
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
    path:'activate/:token',
    component:ActivateComponent
  },
  {
    path:'forgotpassword',
    component:ForgotpasswordComponent,
    canActivate:[NotAuthGuard]

  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'blog',
    component: BlogComponent,
    canActivate:[AuthGuard],

  },
  {
    path:'edit-blog/:id',
    component:EditBlogComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'category' ,
    component: CategoryComponent,
    canActivate:[AuthGuard],
    data: { roles:  'admin' }

  },
  {
    path:'product' ,
    component: ProductComponent,
    canActivate:[AuthGuard],
    data: { roles:  'merchant' }
  },
  {
    path:'service',
    component:ServiceComponent,
    canActivate:[AuthGuard],
    data: { roles:  'serviceProvider' }
  },
  {
    path:'edit-category/:id',
    component:EditCategoryComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit-product/:id',
    component:EditProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'edit-service/:id',
    component:EditServiceComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'items/:id',
    component:ItemsComponent,

  },
  {
    path:'public-product',
    component:PublicProductComponent
  },
  {
    path:'public-service',
    component:PublicServiceComponent
  },
  {
    path:'product/:id',
    component:PProductComponent
  },

  {
    path:'service/:id',
    component:PServiceComponent
  },




  {
    path: '**',
    component: HomeComponent
  }
]);


@NgModule({
  declarations: [],
  imports: [ myRoutes ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModules { }
