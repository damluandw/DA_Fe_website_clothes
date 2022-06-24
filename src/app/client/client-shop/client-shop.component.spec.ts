import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientShopComponent } from './client-shop.component';

describe('ClientShopComponent', () => {
  let component: ClientShopComponent;
  let fixture: ComponentFixture<ClientShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
