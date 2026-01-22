import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  user: any;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload.error
      };

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case AuthActionTypes.SetUser:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: !!action.payload.user
      };

    default:
      return state;
  }
}

// Selectors
export const getUser = (state: AuthState) => state.user;
export const getToken = (state: AuthState) => state.token;
export const getIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const getLoading = (state: AuthState) => state.loading;
export const getError = (state: AuthState) => state.error;
