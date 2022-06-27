import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn!: any

  constructor(private router: Router, private _authService: AuthService) { }



  ngOnInit() {

    this.isLoggedIn = this._authService.isLoggedIn()
  }

  onStartButtonClicked() {
    if(this.isLoggedIn){
      this.router.navigateByUrl('/dashboard')
    }
    else{
      this.router.navigate(['/user-login']);
    }
  }

}
