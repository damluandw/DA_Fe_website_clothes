import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderNewComponent } from './admin-order-new.component';

describe('AdminOrderNewComponent', () => {
  let component: AdminOrderNewComponent;
  let fixture: ComponentFixture<AdminOrderNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
