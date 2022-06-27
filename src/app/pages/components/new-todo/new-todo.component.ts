import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoItem } from 'src/app/models/interfaces/todos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TodoDataService } from 'src/app/services/todo-data.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent implements OnInit {


  // object for form-control

  todoDetails: TodoItem = {
    title: '',
    description: '',
    startDate: new Date(),
    dueDate: new Date(),
    userId: ''
    // status: boolean;
  };

  // variable to hold the return user details data from authService
  loggedInUser: any = {};


  constructor(private route: Router,
    private todoDataService: TodoDataService,
    private _snackbar: MatSnackBar,
    private _authService: AuthService,) {
  }

  ngOnInit() {
    // return the logged in user details
    this.loggedInUser = this._authService.getUserDetails();

  }

  // method for the form submission

  newTodosForm() {
    this.todoDetails.userId =  this.loggedInUser.userId;
    this.todoDataService.postTodo(this.todoDetails).subscribe(
      data => {
        //console.log(`this are the created data ->`, data);
      }
    );

    this._snackbar.open('New todo saved ', 'Ok', { horizontalPosition: 'right', verticalPosition: 'bottom' });
    return this.route.navigate(['dashboard/task']);


  }


}
