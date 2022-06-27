import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './models/angular-material/angular-material.module';
import { AuthModule } from './pages/auth/auth.module';
import { LoginGuard } from './pages/auth/guards/login.guard';
import { ComponentsModule } from './pages/components/components.module';
import { AuthService } from './services/auth.service';
import { TodoDataService } from './services/todo-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // FullCalendarModule,
    AuthModule,
    ComponentsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    TodoDataService,
    AuthService,
    LoginGuard,
    {provide: APP_BASE_HREF, useValue: '/'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
