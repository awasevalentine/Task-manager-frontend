import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantComponent } from './important/important.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { PlannedComponent } from './planned/planned.component';
import { TodosComponent } from './todos/todos.component';
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/models/angular-material/angular-material.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';






// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin
// ])

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ImportantComponent,
    NewTodoComponent,
    PlannedComponent,
    TodosComponent,
    HomeComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // FullCalendarModule,
    AngularMaterialModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [TodosComponent],
  providers: []
})
export class ComponentsModule { }
