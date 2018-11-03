import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecusesPage } from './execuses.page';

describe('ExecusesPage', () => {
  let component: ExecusesPage;
  let fixture: ComponentFixture<ExecusesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecusesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecusesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
