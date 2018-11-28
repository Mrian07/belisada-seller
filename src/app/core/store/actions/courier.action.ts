import { Action } from '@ngrx/store';
import { Courier } from '@belisada-seller/core/models';

export const ActionTypes = {
  LOAD:         '[Courier Load] Load',
  LOAD_SUCCESS: '[Courier Load] Load Success',
  LOAD_FAIL:    '[Courier Load] Load Fail'
};

/**
 * Product ADD Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Array<Courier>) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
