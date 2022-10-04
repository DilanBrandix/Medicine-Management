import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  displayedColumns: string[] = ['username', 'password','employee_Name','email','user_role','plant','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService,
    private matdialog: MatDialog) { }

  ngOnInit(): void {
    this.getallUsers();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    this.matdialog.open(AddUserComponent,{
      width: '30%',
    }).afterClosed().subscribe(value=>{
      if(value==='Add User'){
        this.getallUsers();
      }
    })

  }

  openDeleteDialog(id:number){
    this.matdialog.open(DeleteDialogComponent,{
      width:'23%'
    }).afterClosed().subscribe(value=>{
      if(value==='Yes'){
        this.deleteUser(id);
      }
    })
  }

 getallUsers(){
  this.api.getUsers()
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      console.log(res);
    },
    error:(err)=>{
      alert("Error")
    }
  })
}

deleteUser(id:number){
  this.api.deleteUsers(id)
  .subscribe({
    next: (res)=>{
      alert("User Deleted Successfully")
      this.getallUsers();
    },
    error:(err)=>{
      console.log(err);
      alert("Error")
    }
  })
}
editUser(row:any){
  // console.log(row);
  this.matdialog.open(AddUserComponent,{
    width: '30%',
    data:row
  }).afterClosed().subscribe(value=>{
    if(value==='Update'){
      this.getallUsers();
    }
  })

}
}
