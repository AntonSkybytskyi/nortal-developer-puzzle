import { async, TestBed } from '@angular/core/testing';
import { SharedUiDateRangeModule } from './shared-ui-date-range.module';

describe('SharedUiDateRangeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiDateRangeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiDateRangeModule).toBeDefined();
  });
});
