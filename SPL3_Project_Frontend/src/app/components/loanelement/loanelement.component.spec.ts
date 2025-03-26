import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanelementComponent } from './loanelement.component';

describe('LoanelementComponent', () => {
  let component: LoanelementComponent;
  let fixture: ComponentFixture<LoanelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanelementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
