import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


export interface Users{
  id: number;
  username: String;
  password: String;
  plant: String;
  user_role: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  error: boolean = false;
  errorMessage: String = '';
  username: String = '';
  password: String = '';
  // users: Users[]= [];

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };
    this.loginService.findUser(user).subscribe((result) => {
      this.error = result.error;
      this.errorMessage = result.message;
      // this.users = result
      // console.log(this.users)


      if (!result.error) {
        localStorage.setItem('userToken', JSON.stringify(result.userFromDb));
        if (result.userFromDb.user_role === 'admin') {
          this.router.navigate(['view_medicine']);
        } else {
          this.router.navigate(['receive_medicine']);
        }
      }
    });

  }

}
