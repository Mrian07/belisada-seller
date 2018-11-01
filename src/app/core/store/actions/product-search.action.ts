import { Action } from '@ngrx/store';
import { ProductSuggestion } from '@belisada-seller/core/models';

export const ActionTypes = {
  LOAD:         '[Product Search] Load',
  LOAD_SUCCESS: '[Product Search] Load Success',
  LOAD_FAIL:    '[Product Search] Load Fail'
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

  constructor(public payload: Array<ProductSuggestion>) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
