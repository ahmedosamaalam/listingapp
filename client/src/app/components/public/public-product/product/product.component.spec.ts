import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: PProductComponent;
  let fixture: ComponentFixture<PProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
