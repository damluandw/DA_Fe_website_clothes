import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientHistoryCartDetailComponent } from './client-history-cart-detail.component';

describe('ClientHistoryCartDetailComponent', () => {
  let component: ClientHistoryCartDetailComponent;
  let fixture: ComponentFixture<ClientHistoryCartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientHistoryCartDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientHistoryCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
