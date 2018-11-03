import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPunchesPage } from './my-punches.page';

describe('MyPunchesPage', () => {
  let component: MyPunchesPage;
  let fixture: ComponentFixture<MyPunchesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPunchesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPunchesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
