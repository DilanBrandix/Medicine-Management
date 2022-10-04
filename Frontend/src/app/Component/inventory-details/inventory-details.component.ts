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

export interface Qty{
  Balance_qty: any;
  age: any;
  expire_date:any;
  manufacture_date:any;
  item:any;
  no:number;
  receive_date:any;
  sku: any;
  uom: any;
}

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  tiles: Tile[] = [
    {cols: 2, rows: 2},

  ];

  balance : any[]=[];
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

  displayedColumns: string[] = ['item', 'sku','uom','plant','receive_date','manufacture_date','expire_date','age','Balance_qty'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService,private userDetails:UserDetailsService) { }

  ngOnInit(): void {
    // this.inventoryDetails();
    this.inventoryDetail();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // inventoryDetails(){
  //   this.api.getInventoryDetails()
  //   .subscribe({
  //     next:(res)=>{
  //       this.dataSource = new MatTableDataSource(res);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       // console.log(res);
  //     },
  //     error:(err)=>{
  //       alert("Error")
  //     }
  //   })
  // }

  async inventoryDetail(){
    const userRole = await this.userDetails.getUserRole()
    const plant = await this.userDetails.getPlant()
   if(userRole === 'admin'){
    this.api.getInventoryDetails()
    .subscribe({
      next:(res)=>{
// console.log(res);
        // this.balance = [];
        let details:any=[];
        this.balance=res;
        this.balance.map((quantity:any) => {
                  if(quantity.Balance_qty>0){

                    details.push({
                      no:quantity.no,item:quantity.item,Balance_qty:quantity.Balance_qty,
                      expire_date:quantity.expire_date,manufacture_date:quantity.manufacture_date,
                      age:quantity.age,receive_date:quantity.receive_date,sku:quantity.sku,uom:quantity.uom,plant:quantity.plant})
                  }
                 return details;
                  })

                // console.log(details);
                  this.dataSource = new MatTableDataSource(details);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;

      },
      error:(err)=>{
        alert("Error")
      }
    })
   } else {
    this.api.inv_plant_details(plant)
    .subscribe({
      next:(res)=>{
// console.log(res);
        // this.balance = [];
        let details:any=[];
        this.balance=res;
        this.balance.map((quantity:any) => {
                  if(quantity.Balance_qty>0){

                    details.push({
                      no:quantity.no,item:quantity.item,Balance_qty:quantity.Balance_qty,
                      expire_date:quantity.expire_date,manufacture_date:quantity.manufacture_date,
                      age:quantity.age,receive_date:quantity.receive_date,sku:quantity.sku,uom:quantity.uom,plant:quantity.plant})
                  }
                 return details;
                  })

                // console.log(details);
                  this.dataSource = new MatTableDataSource(details);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;

      },
      error:(err)=>{
        alert("Error")
      }
    })

   }
  }


}
