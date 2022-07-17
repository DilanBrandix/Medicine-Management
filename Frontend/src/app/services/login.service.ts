import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  production= true;
  private apiUrl = `${environment.api}`;

  constructor(private http: HttpClient, private router: Router) { }

  findUser(user: any) {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userToken');

    if (!localStorage.getItem('userToken')) {
      this.router.navigate(['/']);
    }
  }

  isUserAuthenticated() {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
