import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductSizeComponent } from './manage-product-size.component';

describe('ManageProductSizeComponent', () => {
  let component: ManageProductSizeComponent;
  let fixture: ComponentFixture<ManageProductSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
