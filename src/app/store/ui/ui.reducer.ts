import { UiActions, UiActionTypes } from './ui.actions';

export interface UiState {
  loading: boolean;
  loadingMessage: string;
  notifications: any[];
}

export const initialState: UiState = {
  loading: false,
  loadingMessage: '',
  notifications: []
};

export function uiReducer(state = initialState, action: UiActions): UiState {
  switch (action.type) {
    case UiActionTypes.ShowLoading:
      return {
        ...state,
        loading: true,
        loadingMessage: action.payload && action.payload.message || 'Loading...'
      };

    case UiActionTypes.HideLoading:
      return {
        ...state,
        loading: false,
        loadingMessage: ''
      };

    case UiActionTypes.SetLoadingMessage:
      return {
        ...state,
        loadingMessage: action.payload.message
      };

    case UiActionTypes.ShowNotification:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          ...action.payload
        }]
      };

    case UiActionTypes.HideNotification:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload.id)
      };

    default:
      return state;
  }
}

// Selectors
export const getLoading = (state: UiState) => state.loading;
export const getLoadingMessage = (state: UiState) => state.loadingMessage;
export const getNotifications = (state: UiState) => state.notifications;
