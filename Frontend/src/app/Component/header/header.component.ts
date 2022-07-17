import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { UserDetailsService } from 'src/app/services/user-details.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    public userDetails: UserDetailsService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.logout();
  }
}
