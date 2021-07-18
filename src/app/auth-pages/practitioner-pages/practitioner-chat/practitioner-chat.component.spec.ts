import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerChatComponent } from './practitioner-chat.component';

describe('PractitionerChatComponent', () => {
  let component: PractitionerChatComponent;
  let fixture: ComponentFixture<PractitionerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractitionerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
