import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inventory-transaction',
  templateUrl: './inventory-transaction.component.html',
  styleUrls: ['./inventory-transaction.component.css']
})
export class InventoryTransactionComponent implements OnInit {

  displayedColumns: string[] = ['item', 'sku','uom','date','manufacture_date','expire_date','trans_date','method','quantity'];
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
    this.api.getTransactionDetails()
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



