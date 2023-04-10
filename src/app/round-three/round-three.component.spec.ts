import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundThreeComponent } from './round-three.component';

describe('RoundThreeComponent', () => {
  let component: RoundThreeComponent;
  let fixture: ComponentFixture<RoundThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
