import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  SetUser = '[Auth] Set User'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: { user: any; token: string }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: { error: string }) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class SetUser implements Action {
  readonly type = AuthActionTypes.SetUser;
  constructor(public payload: { user: any }) {}
}

export type AuthActions = Login | LoginSuccess | LoginFailure | Logout | SetUser;
