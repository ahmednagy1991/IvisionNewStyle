import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitExecusePage } from './submit-execuse.page';

describe('SubmitExecusePage', () => {
  let component: SubmitExecusePage;
  let fixture: ComponentFixture<SubmitExecusePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitExecusePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitExecusePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
