import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBlogDetailComponent } from './client-blog-detail.component';

describe('ClientBlogDetailComponent', () => {
  let component: ClientBlogDetailComponent;
  let fixture: ComponentFixture<ClientBlogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBlogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
