import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductColorComponent } from './manage-product-color.component';

describe('ManageProductColorComponent', () => {
  let component: ManageProductColorComponent;
  let fixture: ComponentFixture<ManageProductColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
