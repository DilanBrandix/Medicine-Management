import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  // responseData = [];
  // calculateDiff(expire_date : string | number | Date) {
  //   var date1:any = new Date(expire_date);
  //   var date2:any = new Date();
  //   var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

  //   return diffDays;
  // }

  // balanceMedicine =[];
  // calculateBal(quantity : string | number | Date,uom :string | number | Date) {
  //   var quantity1:any = new Number(quantity);
  //   var quantity2:any = new Number(uom);
  //   var diffDays:any = Math.floor((quantity1 - quantity2));

  //   return diffDays;
  // }

  displayedColumns: string[] = ['item', 'sku','uom','receive_date','manufacture_date','expire_date','age','Balance_qty'];
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
    this.api.getInventoryDetails()
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






}
