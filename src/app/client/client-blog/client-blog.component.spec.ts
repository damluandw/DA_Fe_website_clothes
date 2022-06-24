import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBlogComponent } from './client-blog.component';

describe('ClientBlogComponent', () => {
  let component: ClientBlogComponent;
  let fixture: ComponentFixture<ClientBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
