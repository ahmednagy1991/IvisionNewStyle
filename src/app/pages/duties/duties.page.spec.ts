import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutiesPage } from './duties.page';

describe('DutiesPage', () => {
  let component: DutiesPage;
  let fixture: ComponentFixture<DutiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
