import { Component, OnInit } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/angular';
import { TodoItem } from 'src/app/models/interfaces/todos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TodoDataService } from 'src/app/services/todo-data.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  silver: {
    primary: '#C0C0C0',
    secondary: '#C0C0C0',
  },
  green:{
    primary: '#228B22',
    secondary: '#7CFC00	',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-planned',
  templateUrl: './planned.component.html',
  styleUrls: ['./planned.component.css']
})
export class PlannedComponent implements OnInit {
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  loggedInUser: any = {};
  constructor(private todoDataService: TodoDataService, private _authService: AuthService) {

  }


  //This method is used to pick a color based on the status of the task
  displayTaskStatus(todo: TodoItem) {
    const today = new Date();
    const startDate = new Date(todo.startDate);
    const duedate = new Date(todo.dueDate);
    if (today.getDate() < startDate.getDate()) {
      return colors.silver;
    }
    if(today.getDate() >= startDate.getDate() && today.getDate() <= duedate.getDate()) {
      return colors.yellow;
    }
    return colors.green;
  }


  getTodos(){
    return this.todoDataService.getTodosByUserId(this.loggedInUser.userId).subscribe(
      data => {
        data.map(res =>{
          const status = this.displayTaskStatus(res)
          this.events.push({
            title: res.title,
            start: new Date(res.startDate),
            end: new Date(res.dueDate),
            color: status,
            allDay: true,
            resizable: {
              beforeStart:true,
              afterEnd: true,
            },
          })
          this.viewDate = new Date();
        })

      });
  }

  ngOnInit() {
    this.loggedInUser = this._authService.getUserDetails();
    this.getTodos();
    this.events
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event,newStart,newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
