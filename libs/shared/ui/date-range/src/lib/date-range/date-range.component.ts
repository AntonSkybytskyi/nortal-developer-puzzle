import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'coding-challenge-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent implements OnInit {
  @Input() from: AbstractControl;
  @Input() to: AbstractControl;
  maxDate: Date;
  minDate: Date;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.maxDate = new Date();
  }
  onFromDateChanged({ value }) {
    this.minDate = value;
  }
}
