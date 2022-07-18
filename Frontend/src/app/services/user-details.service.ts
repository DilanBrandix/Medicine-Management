import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private admin: boolean = false;
  private user: any;

  constructor() { }

  loadUserToken(): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    }

    return false;
  }

  loadUserRoles() {
    this.user = <any>JSON.parse(localStorage.getItem('userToken') || '');
    if (this.user) {
      if (this.user.user_role === 'admin') {
        this.admin = true;
        // console.log(this.admin);
      }
    }
  }

  getAdmin() {
    this.loadUserRoles();
    // console.log(this.admin);
    return this.admin;

  }

  getUserRole(): String {
    let userRole;
    this.user = <any>JSON.parse(localStorage.getItem('userToken') || '');
    if (this.user) {
      userRole = this.user.user_role;
      console.log('this is '+userRole);
    }
    console.log(userRole);
    return String(userRole);

  }
}
