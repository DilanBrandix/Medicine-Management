import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
