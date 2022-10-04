import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedDialogComponent } from './delete-med-dialog.component';

describe('DeleteMedDialogComponent', () => {
  let component: DeleteMedDialogComponent;
  let fixture: ComponentFixture<DeleteMedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
