import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-expire-details',
  templateUrl: './expire-details.component.html',
  styleUrls: ['./expire-details.component.css']
})
export class ExpireDetailsComponent implements OnInit {

  // responseData = [];
  // calculateDiff(expire_date : string | number | Date) {
  //   var date1:any = new Date(expire_date);
  //   var date2:any = new Date();
  //   var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

  //   return diffDays;
  // }


  displayedColumns: string[] = ['item', 'sku','uom','receive_date','age','expire_date','Balance_qty'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.inventoryDetails();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  inventoryDetails(){
    this.api.getExpireDetails()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        // console.log(res);
      },
      error:(err)=>{
        alert("Error")
      }
    })
  }



}

