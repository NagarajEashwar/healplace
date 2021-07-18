import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCustomerComponent } from './block-customer.component';

describe('BlockCustomerComponent', () => {
  let component: BlockCustomerComponent;
  let fixture: ComponentFixture<BlockCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
