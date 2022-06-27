import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './pages/auth/guards/login.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { HomeComponent } from './pages/components/home/home.component';
import { ImportantComponent } from './pages/components/important/important.component';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { NewTodoComponent } from './pages/components/new-todo/new-todo.component';
import { PlannedComponent } from './pages/components/planned/planned.component';
import { TodosComponent } from './pages/components/todos/todos.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'user-register', component: RegisterComponent
  },
  {
    path: 'user-login', component: LoginComponent
  },
  {
    path: 'layout', component: LayoutComponent
  },
  {
    path: 'dashboard', component: LayoutComponent,
    children: [
      {
        path: '', component: DashboardComponent
      },
      {
        path: 'task', component: TodosComponent, canActivate: [ LoginGuard ]
      },
      {
        path: 'new-todos', component: NewTodoComponent
      },
      {
        path: 'important', component: ImportantComponent, canActivate: [ LoginGuard ]
      },

      {
        path: 'plan', component: PlannedComponent, canActivate: [ LoginGuard ]
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
