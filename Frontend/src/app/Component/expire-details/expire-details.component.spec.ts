import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireDetailsComponent } from './expire-details.component';

describe('ExpireDetailsComponent', () => {
  let component: ExpireDetailsComponent;
  let fixture: ComponentFixture<ExpireDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpireDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
