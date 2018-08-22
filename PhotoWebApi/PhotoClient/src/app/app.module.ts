import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';
import { PhotoService } from './photo.service';

import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { AppRoutingModule } from './app-routing.module';
import { PhotosComponent } from './photos/photos.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { AddphotoComponent } from './addphoto/addphoto.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    PhotosComponent,
    RegisterComponent,
    LoginComponent,
    DetailsComponent,
    AddphotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
