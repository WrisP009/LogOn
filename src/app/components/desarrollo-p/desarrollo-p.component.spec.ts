import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolloPComponent } from './desarrollo-p.component';

describe('DesarrolloPComponent', () => {
  let component: DesarrolloPComponent;
  let fixture: ComponentFixture<DesarrolloPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesarrolloPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolloPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
