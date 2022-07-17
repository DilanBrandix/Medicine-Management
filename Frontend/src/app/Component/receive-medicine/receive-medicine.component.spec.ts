import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveMedicineComponent } from './receive-medicine.component';

describe('ReceiveMedicineComponent', () => {
  let component: ReceiveMedicineComponent;
  let fixture: ComponentFixture<ReceiveMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveMedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
