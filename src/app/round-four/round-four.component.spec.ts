import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundFourComponent } from './round-four.component';

describe('RoundFourComponent', () => {
  let component: RoundFourComponent;
  let fixture: ComponentFixture<RoundFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
