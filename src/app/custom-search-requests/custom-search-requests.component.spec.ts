import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchRequestsComponent } from './custom-search-requests.component';

describe('CustomSearchRequestsComponent', () => {
  let component: CustomSearchRequestsComponent;
  let fixture: ComponentFixture<CustomSearchRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSearchRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSearchRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
