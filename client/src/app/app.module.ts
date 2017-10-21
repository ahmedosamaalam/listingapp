import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModules } from  './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { Http , Headers , RequestOptions ,HttpModule  } from '@angular/http';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule} from  'angular2-flash-messages';
import { AuthGuard } from './services/gaurds/auth-guard.service';
import { NotAuthGuard } from './services/gaurds/not-auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModules,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule

  ],
  providers: [AuthService ,AuthGuard,NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
