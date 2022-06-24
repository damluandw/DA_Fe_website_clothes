import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountRegisterComponent } from './client-account-register.component';

describe('ClientAccountRegisterComponent', () => {
  let component: ClientAccountRegisterComponent;
  let fixture: ComponentFixture<ClientAccountRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccountRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
