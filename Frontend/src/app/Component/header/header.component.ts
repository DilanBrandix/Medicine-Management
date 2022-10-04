import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,private matdialog: MatDialog,
    public userDetails: UserDetailsService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.logout();
  }


}
