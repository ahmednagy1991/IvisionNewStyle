import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitLeaveResuestPage } from './submit-leave-resuest.page';

describe('SubmitLeaveResuestPage', () => {
  let component: SubmitLeaveResuestPage;
  let fixture: ComponentFixture<SubmitLeaveResuestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitLeaveResuestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitLeaveResuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
