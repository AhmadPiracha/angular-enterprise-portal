import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectLoading = createSelector(
  selectUiState,
  (state: UiState) => state.loading
);

export const selectLoadingMessage = createSelector(
  selectUiState,
  (state: UiState) => state.loadingMessage
);

export const selectNotifications = createSelector(
  selectUiState,
  (state: UiState) => state.notifications
);
