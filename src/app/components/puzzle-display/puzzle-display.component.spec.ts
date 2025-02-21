import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleDisplayComponent } from './puzzle-display.component';

describe('PuzzleDisplayComponent', () => {
  let component: PuzzleDisplayComponent;
  let fixture: ComponentFixture<PuzzleDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
