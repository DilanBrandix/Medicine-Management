import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-stock-level',
  templateUrl: './stock-level.component.html',
  styleUrls: ['./stock-level.component.css']
})
export class StockLevelComponent implements OnInit {




   total:any=0;

  displayedColumns: string[] = ['item', 'sku','uom','Balance_qty'];
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
    this.api.getMinStock()
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
