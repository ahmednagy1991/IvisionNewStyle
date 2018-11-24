import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPunchingPage } from './geo-punching.page';

describe('GeoPunchingPage', () => {
  let component: GeoPunchingPage;
  let fixture: ComponentFixture<GeoPunchingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoPunchingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoPunchingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
