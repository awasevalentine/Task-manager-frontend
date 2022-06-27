import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TodoDataService } from 'src/app/services/todo-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  openSidenav!:boolean;
  private screenWidth$ = new BehaviorSubject<number> (window.innerWidth);

  @ViewChild('sidenav') matSidenav!: MatSidenav;

  loggedInUser: any = {};
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  message: string;
  menuItems!: any[];
  events: String[] = [];
  opened!: boolean;

  importantTaskCount!: number;

  constructor(private _todoService: TodoDataService,
              public authService: AuthService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private router: Router
  ) {
    this.message = "";
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit() {

    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
       this.openSidenav = false;
     }
     else if (width > 640) {
       this.openSidenav = true;
     }
   });

    this.loggedInUser = this.authService.getUserDetails();
    if(this.authService.isLoggedIn()){
    this.router.navigateByUrl('/dashboard/task');
    } else {
      this.router.navigateByUrl('/user-login');
    }
   setInterval(
      ()=> {
        this.getImportantTodos();
      }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }



  getImportantTodos() {
    this._todoService.getImportantTodos(this.loggedInUser.userId).then(
      (importantTodos) => {
        this.importantTaskCount = importantTodos.length;
      }
    );
  }

  login() {
    this.authService.userLogin();
  }


  setting(): boolean {
    //this.authService.logOut();
    alert('coming up soon!');
    return false;
    }

  logout(): boolean {
    this.authService.logOut();
    return false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
