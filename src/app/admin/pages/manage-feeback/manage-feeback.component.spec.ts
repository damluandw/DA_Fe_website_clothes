import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeebackComponent } from './manage-feeback.component';

describe('ManageFeebackComponent', () => {
  let component: ManageFeebackComponent;
  let fixture: ComponentFixture<ManageFeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFeebackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
