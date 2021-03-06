import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  priceQueryAdapter,
  PriceQueryState,
  PRICEQUERY_FEATURE_KEY
} from './price-query.reducer';

const getPriceQueryState = createFeatureSelector<PriceQueryState>(
  PRICEQUERY_FEATURE_KEY
);

export const getSelectedSymbol = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.selectedSymbol
);

const { selectAll } = priceQueryAdapter.getSelectors();

export const getAllPriceQueries = createSelector(
  getPriceQueryState,
  selectAll
);

export const getPriceError = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => state.error,
);

export const getFilteredPriceQueries = createSelector(
  getPriceQueryState,
  (state: PriceQueryState) => {
    const { selectedRangeFrom, selectedRangeTo } = state;
    const from = selectedRangeFrom ? new Date(selectedRangeFrom).getTime() : null;
    const to = selectedRangeTo ? new Date(selectedRangeTo).getTime() : null;

    return Object.values(state.entities).filter(entry => {
      const entryDate = new Date(entry.date).getTime();
      const isAfter = from === null || from <= entryDate;
      const isBefore = to === null || to >= entryDate;
      return isAfter && isBefore;
    });
  },
)