import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { AddMedicineComponent } from '../add-medicine/add-medicine.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.css']
})
export class ViewMedicineComponent implements OnInit {
  displayedColumns: string[] = ['item', 'sku','uom','min_stock','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService,
    private matdialog: MatDialog) { }

  ngOnInit(): void {
    this.getallMedicine();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    this.matdialog.open(AddMedicineComponent,{
      width: '30%',
    }).afterClosed().subscribe(value=>{
      if(value==='Save'){
        this.getallMedicine();
      }
    })

  }

 getallMedicine(){
  this.api.getMedicine()
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

deleteItem(no:number){
  this.api.deleteMedicine(no)
  .subscribe({
    next: (res)=>{
      alert("Medicine Deleted Successfully")
      this.getallMedicine();
    },
    error:(err)=>{
      console.log(err);
      alert("Error")
    }
  })
}

}
