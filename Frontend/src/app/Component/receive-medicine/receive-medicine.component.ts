import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { UserDetailsService } from 'src/app/services/user-details.service';


export interface Tile {
  cols: number;
  rows: number;
}

export interface Select{
  no: number;
  item: string;
  sku: string;
}

export interface Sku{
  sku: string;
}
export interface Uom{
  uom: string;
}

@Component({
  selector: 'app-receive-medicine',
  templateUrl: './receive-medicine.component.html',
  styleUrls: ['./receive-medicine.component.css']
})
export class ReceiveMedicineComponent implements OnInit {

  //Aging calculation
  // responseData = [];
  // calculateDiff(expire_date : string | number | Date) {
  //   var date1:any = new Date(expire_date);
  //   var date2:any = new Date();
  //   var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

  //   return diffDays;
  // }

  date = new FormControl(new Date());

  tiles: Tile[] = [
    {cols: 1, rows: 1},

  ];

  //Arrays and Variables declared
  selects: Select[] = [];
  skus: Sku[] = [];
  uoms:Uom[]=[];
  selectedItem: string = "";
  selectedSku: string = "";
  message: string = "";
  balance : any[]=[];
  checked =  false;
  user: any;
  id: any;

  receiveForm!:FormGroup


  displayedRows: string[] = ['balance'];
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private userDetails:UserDetailsService
  ) {}


// ng onit loads data at the begining
  ngOnInit(): void {
    this.receiveForm = this.formBuilder.group({
      date: [this.date.value, Validators.required],
      manufacture_date: ['', Validators.required],
      expire_date: ['', Validators.required],
      item: ['', Validators.required],
      sku: ['', Validators.required],
      uom: ['', Validators.required],
      quantity: ['', Validators.required],
      plant: ['', Validators.required],
      user_id: ['', Validators.required],
      remarks: [''],
  });


  this.getallMedicine();
  this.method();
  this.method1();
  this.getReceivedMedicine();
  this.getUser();
  // this.getBalanceQuantity();

  }


  displayedColumns: string[] = ['receive_date','manufacture_date','expire_date', 'age', 'Balance_qty'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }


//SKU Dropdown
  method(){
    if(this.selectedItem){
      this.api.getSku(this.selectedItem)
      // console.log(this.selectedItem);
      .subscribe({
        next:(res)=>{
          this.skus=[];
          this.skus =res;
          // console.log(res);

        },
        error:()=>{
          alert("Error")

        }
      })
    }

  }

//UOM Dropdown
  method1(){
    if(this.selectedItem && this.selectedSku){
      this.api.getUom(this.selectedItem,this.selectedSku)
      // console.log(this.selectedItem);
      .subscribe({
        next:(res)=>{
          this.uoms=[];
          this.uoms =res;
          // console.log(res);

        },
        error:()=>{
          alert("Error")

        }
      })
    }

  }

//Items Dropdown
  getallMedicine(){
    this.api.getitems()
    .subscribe({
      next:(data)=>{
        this.selects=[];
        this.selects=data;
        // console.log(data);
      },
      error:(err)=>{
        alert("Error")
      }
    })
  }


//Insert Received Medicine
  receiveMedicine(){
    if(this.receiveForm.valid){
      // console.log(this.receiveForm.value)
      this.api.postReceiveMedicine(this.receiveForm.value)
      .subscribe({
        next:(res)=>{
          // console.log(res);
          alert("Medicine Updated successfully")
          this.receiveForm.controls['manufacture_date'].reset();
          this.receiveForm.controls['expire_date'].reset();
          this.receiveForm.controls['item'].reset();
          this.receiveForm.controls['sku'].reset();
          this.receiveForm.controls['uom'].reset();
          this.receiveForm.controls['quantity'].reset();
          this.receiveForm.controls['remarks'].reset();
          this.getReceivedMedicine();

        },
        error:()=>{
          alert("Error")

        }

      })
    }
    else{
      this.message="Please Fill All The Fields"
    }

}

//Dynamic Table
getReceivedMedicine(){
  if(this.selectedItem && this.selectedSku && this.user.plant){
    // console.log("item and sku " + this.selectedItem, this.selectedSku)
  this.api.getMedicineDetails(this.selectedItem,this.selectedSku, this.user.plant)
  .subscribe({
    next:(res)=>{
      let details:any=[];
      this.balance=res;
      this.balance.map((quantity:any) => {
                if(quantity.Balance_qty>0){

                  details.push({
                    no:quantity.no,item:quantity.item,Balance_qty:quantity.Balance_qty,
                    expire_date:quantity.expire_date,manufacture_date:quantity.manufacture_date,
                    age:quantity.age,receive_date:quantity.receive_date,sku:quantity.sku,uom:quantity.uom})
                }
               return details;
                })

              // console.log(details);
                this.dataSource = new MatTableDataSource(details);
                this.dataSource.paginator = this.paginator;
                // this.dataSource.sort = this.sort;

    },
    error:(err)=>{
      alert("Error")
    }
  })
}
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
// getBalanceQuantity(){
//   this.api.getBalance()
//   .subscribe({
//     next:(res)=>{
//       this.balances=[];
//         this.balances=res;
//       console.log(this.balances);
//     },
//     error:(err)=>{
//       alert("Error")
//     }
//   })
// }
}
