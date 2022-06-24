import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductStyleComponent } from './manage-product-style.component';

describe('ManageProductStyleComponent', () => {
  let component: ManageProductStyleComponent;
  let fixture: ComponentFixture<ManageProductStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
