import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopNewComponent } from './stop-new.component';

describe('StopNewComponent', () => {
  let component: StopNewComponent;
  let fixture: ComponentFixture<StopNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
