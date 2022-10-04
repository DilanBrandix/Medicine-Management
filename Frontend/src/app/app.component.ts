import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: boolean = false;
  title = 'Medicine Management';
  apiURL = environment.api;

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken')) {
      return true
    }else{
      return false
    }
  }
}
