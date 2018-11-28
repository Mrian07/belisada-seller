import { Action } from '@ngrx/store';
import { VariantAttr } from '@belisada-seller/core/models';

export const ActionTypes = {
  LOAD:         '[Product Variant] Load',
  LOAD_SUCCESS: '[Product Variant] Load Success',
  LOAD_FAIL:    '[Product Variant] Load Fail'
};

/**
 * Product ADD Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: number = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: VariantAttr[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actionsz
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
