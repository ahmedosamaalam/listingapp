import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServiceComponent } from './public-service.component';

describe('PublicServiceComponent', () => {
  let component: PublicServiceComponent;
  let fixture: ComponentFixture<PublicServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
