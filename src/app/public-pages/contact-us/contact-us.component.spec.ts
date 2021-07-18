import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContactusComponent } from './contact-us.component';

describe('PublicContactusComponent', () => {
  let component: PublicContactusComponent;
  let fixture: ComponentFixture<PublicContactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicContactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
