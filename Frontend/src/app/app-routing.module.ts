import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiveMedicineComponent } from './Component/receive-medicine/receive-medicine.component';
import { AddMedicineComponent } from './Component/add-medicine/add-medicine.component';
import { ViewMedicineComponent } from './Component/view-medicine/view-medicine.component';
import { IssueMedicineComponent } from './Component/issue-medicine/issue-medicine.component';
import { LoginComponent } from './Component/login/login.component';
import { ReportComponent } from './Component/report/report.component';
import { InventoryDetailsComponent } from './Component/inventory-details/inventory-details.component';
import { InventoryTransactionComponent } from './Component/inventory-transaction/inventory-transaction.component';
import { StockLevelComponent } from './Component/stock-level/stock-level.component';
import { ExpireDetailsComponent } from './Component/expire-details/expire-details.component';
import { AuthGuard } from './Component/authentication/authentication';

const routes: Routes = [
  { path: '', redirectTo: 'view_medicine', pathMatch: 'full' },
  {
    path: 'receive_medicine',
    component: ReceiveMedicineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'issue_medicine',
    component: IssueMedicineComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view_medicine',
    component: ViewMedicineComponent,
    canActivate: [AuthGuard],
  },
  { path: 'view_report', component: ReportComponent, canActivate: [AuthGuard] },
  {
    path: 'inventory_details',
    component: InventoryDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory_transaction',
    component: InventoryTransactionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stock_level',
    component: StockLevelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expire_details',
    component: ExpireDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
