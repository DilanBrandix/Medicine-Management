import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ApiService } from 'src/app/services/api.service';
import {FormControl} from '@angular/forms';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {

  user: any;
  id: any;
  hide = true;

  userForm!:FormGroup

  constructor(private userDetails:UserDetailsService, private api:ApiService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      user_role: ['', Validators.required],
      plant: ['', Validators.required],




  });
  this.getUser();
}

  async getUser(){
    this.id = await this.userDetails.getUserDetails()
    // console.log(this.userDetails.getUserDetails());
    this.api.userDetails(this.id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.user = res;
        // console.log(this.user);

      },
    error:(err)=>{
      alert("Error")
    }
    })


  }

  changePassword(){
    this.api.updateUser(this.userForm.value,this.id).subscribe({
      next: (res)=>{
        // console.log(res);
        alert('Password updated successfully');
        this.getUser();
      },
      error: () => {
        alert('Error while updating');
      },
    });


}



}
