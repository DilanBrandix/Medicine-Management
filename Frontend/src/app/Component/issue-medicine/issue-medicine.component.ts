import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import {FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

export interface Select{
  no: number;
  item: string;
  sku: string;
}

export interface Selection{
date: Date;
expire_date: Date;
item: string
manufacture_date: Date;
no: number;
quantity: number;
sku: string;
uom: string;

}

export interface Sku{
  sku: string;
}
export interface Uom{
  uom: string;
}


@Component({
  selector: 'app-issue-medicine',
  templateUrl: './issue-medicine.component.html',
  styleUrls: ['./issue-medicine.component.css']
})
export class IssueMedicineComponent implements OnInit {

  responseData = [];
  calculateDiff(expire_date : string | number | Date) {
    var date1:any = new Date(expire_date);
    var date2:any = new Date();
    var diffDays:any = Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  selects: Select[] = [];
  selections: Selection[] = [];
  skus: Sku[] = [];
  uoms:Uom[]=[];
  selectedItem: string = "";
  selectedSku: string = "";


  issueForm!:FormGroup
  displayedRows: string[] = ['balance'];
  date = new FormControl(new Date());

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.issueForm = this.formBuilder.group({
      issue_no: ['', Validators.required],
      issue_date: [this.date.value, Validators.required],
      item: ['', Validators.required],
      sku: ['', Validators.required],
      uom: ['', Validators.required],
      method: ['', Validators.required],
      manufacture_date: ['', Validators.required],
      expire_date: ['', Validators.required],
      quantity: ['', Validators.required],


  });


    this.getallMedicine();
    this.method();
    this.method1();
    this.getReceivedMedicine();
    this.issueMedicine();
  }
  displayedColumns: string[] = ['receive_date','manufacture_date','expire_date', 'age', 'Balance_qty'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);


  isAllSelected() {
    console.log(this.selection);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
     console.log(this.selection);
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectRow(row : any) {
    this.selection.toggle(row);
    this.selections=[];
    this.selections = this.selection.selected
    console.log(this.selections);
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


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
    if(this.selectedItem){
      this.api.getUom(this.selectedItem)
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

  issueMedicine(){
    if( this.issueForm.valid){
      this.api.postIssueMedicine(this.issueForm.value)
      .subscribe({
        next:(res)=>{
          console.log(res);
          alert("Medicine Issued successfully")
          this.issueForm.controls['issue_no'].reset();
          this.issueForm.controls['item'].reset();
          this.issueForm.controls['sku'].reset();
          this.issueForm.controls['uom'].reset();
          this.issueForm.controls['method'].reset();
          this.issueForm.controls['manufacture_date'].reset();
          this.issueForm.controls['expire_date'].reset();
          this.issueForm.controls['quantity'].reset();
          this.getReceivedMedicine();

        },
        error:()=>{
          alert("Error")

        }

      })
    }
  }

  //Dynamic Table
getReceivedMedicine(){
  if(this.selectedItem && this.selectedSku){
    // console.log("item and sku " + this.selectedItem, this.selectedSku)
  this.api.getMedicineDetails(this.selectedItem,this.selectedSku)
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.responseData=res;
        // this.dataSource.sort = this.sort;

    },
    error:(err)=>{
      alert("Error")
    }
  })
}
}


}
