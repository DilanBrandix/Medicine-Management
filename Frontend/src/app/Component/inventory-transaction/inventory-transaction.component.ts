import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

export interface Tile {
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-inventory-transaction',
  templateUrl: './inventory-transaction.component.html',
  styleUrls: ['./inventory-transaction.component.css']
})
export class InventoryTransactionComponent implements OnInit {

  tiles: Tile[] = [
    {cols: 3, rows: 2},

  ];


  displayedColumns: string[] = ['item', 'sku','uom','plant','date','manufacture_date','expire_date','trans_date','method','quantity','remarks'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService,private userDetails:UserDetailsService) { }

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
  async inventoryDetails(){
    const userRole = await this.userDetails.getUserRole()
    const plant = await this.userDetails.getPlant()
    if(userRole === 'admin'){
      this.api.getTransactionDetails()
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

    }else {
      this.api.transaction_details_plant(plant)
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



}



