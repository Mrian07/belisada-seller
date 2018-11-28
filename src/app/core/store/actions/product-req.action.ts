import { Action } from '@ngrx/store';
import { ProdReq } from '@belisada-seller/core/models';

export const ActionTypes = {
  LOAD:         '[Product req] Load',
  LOAD_SUCCESS: '[Product req] Load Success',
  LOAD_FAIL:    '[Product req] Load Fail'
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

  constructor(public payload: Array<ProdReq>) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
