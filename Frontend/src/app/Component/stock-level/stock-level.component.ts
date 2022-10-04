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
  selector: 'app-stock-level',
  templateUrl: './stock-level.component.html',
  styleUrls: ['./stock-level.component.css']
})
export class StockLevelComponent implements OnInit {

  tiles: Tile[] = [
    {cols: 2, rows: 2},
  ];

   total:any=0;

  displayedColumns: string[] = ['item', 'sku','uom','plant','Balance_qty','min_stock'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService, private userDetails:UserDetailsService) { }

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
    this.api.getMinStock()
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
    this.api.min_stock_plant(plant)
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

  // quantity(){
  //   let sample: any[] = []

  //   this.api.receivedmedicine()
  //   .subscribe({
  //     next:(res)=>{
  //       sample = <any>res;
  //       sample.map((item:any) => {
  //         if(item.item==='Panadol'&& item.sku=='500mg'){
  //           this.total+=item.quantity

  //           console.log(this.total);
  //         }
  //         })

  //     },
  //     error:(err)=>{
  //       alert("Error")
  //     }
  //   })
  // }



}
