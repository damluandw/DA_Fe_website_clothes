import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccountInformationComponent } from './client-account-information.component';

describe('ClientAccountInformationComponent', () => {
  let component: ClientAccountInformationComponent;
  let fixture: ComponentFixture<ClientAccountInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAccountInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
