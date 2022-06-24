import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderOldComponent } from './admin-order-old.component';

describe('AdminOrderOldComponent', () => {
  let component: AdminOrderOldComponent;
  let fixture: ComponentFixture<AdminOrderOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
