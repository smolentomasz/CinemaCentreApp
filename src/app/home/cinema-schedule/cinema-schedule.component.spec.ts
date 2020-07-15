import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaScheduleComponent } from './cinema-schedule.component';

describe('CinemaScheduleComponent', () => {
  let component: CinemaScheduleComponent;
  let fixture: ComponentFixture<CinemaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
