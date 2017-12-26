import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModules } from  './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { BlogService} from "./services/blog.service";
import { Http , Headers , RequestOptions ,HttpModule  } from '@angular/http';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule} from  'angular2-flash-messages';
import { AuthGuard } from './services/gaurds/auth-guard.service';
import { NotAuthGuard } from './services/gaurds/not-auth-guard.service';
import { HomeComponent} from "./components/home/home.component";
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { ActivateComponent } from './components/activate/activate.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryService} from "./services/category.service";
import { ProductComponent } from './components/product/product.component';
import { ProductService } from "./services/product.service";
import { ServiceComponent } from './components/service/service.component';
import { ServiceService} from "./services/service.service";
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { EditServiceComponent } from './components/service/edit-service/edit-service.component';
import { ItemsComponent } from './components/public/items/items.component';
import { PublicService} from "./services/public.service";
import { PublicServiceComponent } from './components/public/public-service/public-service.component';
import { PublicProductComponent } from './components/public/public-product/public-product.component';
import { ItemComponent } from './components/public/items/item/item.component';
import { PProductComponent } from "./components/public/public-product/product/product.component";
import { PServiceComponent } from "./components/public/public-service/service/service.component";
import { BarRatingModule } from "ngx-bar-rating";
import { AdminService } from "./services/admin.service";


//import { ImageUploadModule } from "angular2-image-upload";



//
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCheckboxModule , MatCard } from '@angular/material';
// import {  MatCardModule } from '@angular/material';
// import {MatFormFieldModule, MatInputModule} from '@angular/material';
// import {MatButtonModule} from '@angular/material/button';
// import { MasonryModule } from 'angular2-masonry';
// import {MatGridListModule} from '@angular/material';









@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent,
    ActivateComponent,
    ForgotpasswordComponent,
    CategoryComponent,
    ProductComponent,
    ServiceComponent,
    EditCategoryComponent,
    EditProductComponent,
    EditServiceComponent,
    ItemsComponent,
    PublicServiceComponent,
    PublicProductComponent,
    ItemComponent,
    PProductComponent,
    PServiceComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModules,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    NgxPaginationModule,
    BarRatingModule,

    //ImageUploadModule.forRoot(),

  ],
  providers: [AuthService ,AuthGuard,NotAuthGuard, BlogService, CategoryService ,ProductService,ServiceService,PublicService , AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
