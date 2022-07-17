import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Component/header/header.component';
import { LoginComponent } from './Component/login/login.component';
import { AddMedicineComponent } from './Component/add-medicine/add-medicine.component';
import { ViewMedicineComponent } from './Component/view-medicine/view-medicine.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReceiveMedicineComponent } from './Component/receive-medicine/receive-medicine.component';
import { IssueMedicineComponent } from './Component/issue-medicine/issue-medicine.component';
import { ReportComponent } from './Component/report/report.component';
import { InventoryDetailsComponent } from './Component/inventory-details/inventory-details.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { InventoryTransactionComponent } from './Component/inventory-transaction/inventory-transaction.component';
import { StockLevelComponent } from './Component/stock-level/stock-level.component';
import { ExpireDetailsComponent } from './Component/expire-details/expire-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AddMedicineComponent,
    ViewMedicineComponent,
    ReceiveMedicineComponent,
    IssueMedicineComponent,
    ReportComponent,
    InventoryDetailsComponent,
    InventoryTransactionComponent,
    StockLevelComponent,
    ExpireDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableExporterModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
