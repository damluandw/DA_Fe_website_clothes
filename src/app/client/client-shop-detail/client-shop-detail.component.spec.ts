import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShopDetailComponent } from './client-shop-detail.component';

describe('ClientShopDetailComponent', () => {
  let component: ClientShopDetailComponent;
  let fixture: ComponentFixture<ClientShopDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientShopDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientShopDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
