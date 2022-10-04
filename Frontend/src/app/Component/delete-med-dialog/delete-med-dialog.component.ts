import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-med-dialog',
  templateUrl: './delete-med-dialog.component.html',
  styleUrls: ['./delete-med-dialog.component.css']
})
export class DeleteMedDialogComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<DeleteMedDialogComponent>) { }

  ngOnInit(): void {
  }

  deleteMedicine(){
    this.dialogref.close('Yes');
  }

}
