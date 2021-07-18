import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHowitworksComponent } from './howitworks.component';

describe('PublicHowitworksComponent', () => {
  let component: PublicHowitworksComponent;
  let fixture: ComponentFixture<PublicHowitworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHowitworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHowitworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
