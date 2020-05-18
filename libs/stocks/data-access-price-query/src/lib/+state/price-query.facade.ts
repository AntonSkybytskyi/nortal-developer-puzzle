import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery, SelectSymbol, SelectDateRange } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getSelectedSymbol, getFilteredPriceQueries, getPriceError } from './price-query.selectors';
import { map, skip } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  selectedSymbol$ = this.store.pipe(select(getSelectedSymbol));
  priceError$ = this.store.pipe(select(getPriceError));
  priceQueries$ = this.store.pipe(
    select(getFilteredPriceQueries),
    skip(1),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  setSymbol(symbol: string = '') {
    this.store.dispatch(new SelectSymbol(symbol));
  }
  fetchQuote(symbol: string, period: string) {
    this.store.dispatch(new FetchPriceQuery(symbol, period));
  }
  setCustomDate(from: string | null, to: string | null) {
    this.store.dispatch(new SelectDateRange(from, to));
  }

}
