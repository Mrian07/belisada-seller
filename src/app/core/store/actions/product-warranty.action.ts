import { Action } from '@ngrx/store';
import { Reference } from '@belisada-seller/core/models';

export const ActionTypes = {
  LOAD:         '[Product Warannty] Load',
  LOAD_SUCCESS: '[Product Warannty] Load Success',
  LOAD_FAIL:    '[Product Warannty] Load Fail'
};

/**
 * Product ADD Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any = []) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Reference[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
