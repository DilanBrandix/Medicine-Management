import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {

  medicineForm!: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialogref: MatDialogRef<AddMedicineComponent>
  ) {}

  ngOnInit(): void {
    this.medicineForm = this.formBuilder.group({
      item: ['', Validators.required],
      sku: ['', Validators.required],
      uom: ['', Validators.required],
      min_stock: ['', Validators.required],
    });
    // if (this.medicine) {

    //   this.medicineForm.controls['item'].setValue(
    //     this.medicineForm.item);

    //     this.medicineForm.controls['employee_Name'].setValue(
    //       this.medicineForm.employee_Name);
    //     }
  }

  addInventory() {
    if (this.medicineForm.valid) {
      // console.log(this.medicineForm.value)
      this.api.postMedicine(this.medicineForm.value).subscribe({
        next: (res) => {
          console.log(res);
          alert('Medicine added successfully');
          this.medicineForm.reset();
          this.dialogref.close();

        },
        error: () => {
          alert('Error');
        },
      });
    }
  }
}
