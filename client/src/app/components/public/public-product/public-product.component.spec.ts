import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProductComponent } from './public-product.component';

describe('PublicProductComponent', () => {
  let component: PublicProductComponent;
  let fixture: ComponentFixture<PublicProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
