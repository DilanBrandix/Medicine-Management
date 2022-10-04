import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  actionButton: String = "Add User"

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editUser:any,
    private dialogref: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      user_role: ['', Validators.required],
      plant: ['', Validators.required],
      employee_Name: ['', Validators.required],
      email: ['', Validators.required],

    });
    if (this.editUser) {
      this.actionButton = "Update"
        this.userForm.controls['username'].setValue(
          this.editUser.username);

          this.userForm.controls['password'].setValue(
            this.editUser.password);

            this.userForm.controls['user_role'].setValue(
              this.editUser.user_role);

              this.userForm.controls['plant'].setValue(
                this.editUser.plant);

                this.userForm.controls['employee_Name'].setValue(
                  this.editUser.employee_Name);

                  this.userForm.controls['email'].setValue(
                    this.editUser.email);
        }
    // console.log(this.editUser);
  }

  addUser() {
    if(!this.editUser){
      if (this.userForm.valid) {
        //console.log(this.userForm.value)
        this.api.addUsers(this.userForm.value).subscribe({
          next: (res) => {
            console.log(res);
            alert('User added successfully');
            this.userForm.reset();
            this.dialogref.close('Add User');

          },
          error: () => {
            alert('Error');
          },
        });
      }
      }else{
        this.updateUser();
    }
  }

  updateUser(){
    this.api.updateUser(this.userForm.value,this.editUser.id).subscribe({
      next: (res)=>{
        // console.log(res);
        alert('User updated successfully');
        this.userForm.reset();
        this.dialogref.close('Update');
      },
      error: () => {
        alert('Error while updating');
      },
    });


}
}

