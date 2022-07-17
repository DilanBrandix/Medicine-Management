import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: boolean = false;
  title = 'Medicine Management';

  isLoggedIn(): boolean {
    if (localStorage.getItem('userToken')) {
      return true
    }else{
      return false
    }
  }
}
