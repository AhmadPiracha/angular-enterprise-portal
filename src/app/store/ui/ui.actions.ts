import { Action } from '@ngrx/store';

export enum UiActionTypes {
  ShowLoading = '[UI] Show Loading',
  HideLoading = '[UI] Hide Loading',
  SetLoadingMessage = '[UI] Set Loading Message',
  ShowNotification = '[UI] Show Notification',
  HideNotification = '[UI] Hide Notification'
}

export class ShowLoading implements Action {
  readonly type = UiActionTypes.ShowLoading;
  constructor(public payload?: { message?: string }) {}
}

export class HideLoading implements Action {
  readonly type = UiActionTypes.HideLoading;
}

export class SetLoadingMessage implements Action {
  readonly type = UiActionTypes.SetLoadingMessage;
  constructor(public payload: { message: string }) {}
}

export class ShowNotification implements Action {
  readonly type = UiActionTypes.ShowNotification;
  constructor(public payload: { type: string; message: string; details?: string }) {}
}

export class HideNotification implements Action {
  readonly type = UiActionTypes.HideNotification;
  constructor(public payload: { id: string }) {}
}

export type UiActions = 
  | ShowLoading 
  | HideLoading 
  | SetLoadingMessage 
  | ShowNotification 
  | HideNotification;
