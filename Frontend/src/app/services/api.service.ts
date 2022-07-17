import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `${environment.api}`;

  constructor(private http : HttpClient) { }

  postMedicine(data : any){
    return this.http.post<any>(`${this.apiUrl}/medicine`,data);
  }

  getMedicine(){
    return this.http.get<any>(`${this.apiUrl}/medicine`);
  }

  deleteMedicine(no:number){
    return this.http.delete<any>("http://localhost:3000/medicine/"+no);
  }
  receivedmedicine(){
    return this.http.get<any>(`${this.apiUrl}/receive-medicine`);
  }

  postReceiveMedicine(data : any){
    return this.http.post<any>(`${this.apiUrl}/receive-medicine`,data);
  }

  postIssueMedicine(data : any){
    return this.http.post<any>(`${this.apiUrl}/issue-medicine`,data);
  }

  issuedmedicine(){
    return this.http.get<any>(`${this.apiUrl}/issue-medicine`);
  }

  getSku(item:string){
    return this.http.get<any>(`${this.apiUrl}/receive-medicine/items/${item}`);
  }

  getMedicineDetails(item:string, sku:string){
    return this.http.get<any>(`${this.apiUrl}/receive-medicine/items/${item}/${sku}`);
}

getUom(item:string){
  return this.http.get<any>(`${this.apiUrl}/receive-medicine/uom/${item}`);
}
getitems(){
  return this.http.get<any>(`${this.apiUrl}/medicine/med_items`);
}
getInventoryDetails(){
  return this.http.get<any>(`${this.apiUrl}/issue-medicine/inv_details`);
}
getTransactionDetails(){
  return this.http.get<any>(`${this.apiUrl}/issue-medicine/transaction_details`);
}
getExpireDetails(){
  return this.http.get<any>(`${this.apiUrl}/issue-medicine/expire_details`);
}
getMinStock(){
  return this.http.get<any>(`${this.apiUrl}/issue-medicine/min_stock`);
}
}
