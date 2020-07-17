import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationOverviewComponent } from './reservation-overview.component';

describe('ReservationOverviewComponent', () => {
  let component: ReservationOverviewComponent;
  let fixture: ComponentFixture<ReservationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
