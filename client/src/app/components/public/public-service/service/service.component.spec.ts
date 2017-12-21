import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PServiceComponent } from './service.component';

describe('ServiceComponent', () => {
  let component: PServiceComponent;
  let fixture: ComponentFixture<PServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
