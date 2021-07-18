import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAboutusComponent } from './about-us.component';

describe('PublicAboutusComponent', () => {
  let component: PublicAboutusComponent;
  let fixture: ComponentFixture<PublicAboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
