import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;
  error$ = this.priceQuery.priceError$
  selectedSymbol$ = this.priceQuery.selectedSymbol$
  private dispose$: Subject<symbol> = new Subject();
  private readonly debounceTime = 200;


  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, [Validators.required, Validators.pattern('^[a-zA-Z]+')]],
      period: [null, Validators.required],
      from: [null],
      to: [null],
    });
  }

  ngOnInit() {
    this.stockPickerForm.controls.symbol.valueChanges.pipe(
      takeUntil(this.dispose$),
      debounceTime(this.debounceTime),
    ).subscribe((value: string) => this.priceQuery.setSymbol(value));

    this.selectedSymbol$.subscribe(() => {
      takeUntil(this.dispose$),
      this.fetchQuote();
    });
  }

  ngOnDestroy() {
    this.dispose$.next(Symbol());
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period, from, to } = this.stockPickerForm.value;
      this.priceQuery.setCustomDate(from, to);

      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
