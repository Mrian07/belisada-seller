
// import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as productDetailsActions from '../actions/product.actions';
import * as productSearchActions from '../actions/product-search.action';
import * as prodReq from '../actions/product-req.action';
import * as proddetailAdd from '../actions/product-detail.action';
import * as prodWarranty from '../actions/product-warranty.action';
import * as prodWarrantyLong from '../actions/product-warranty-long.action';
import * as prodVariant from '../actions/product-variant.action';
import * as courier from '../actions/courier.action';
import * as postV2 from '../actions/product-detail-post.action';
import { Store } from '@ngrx/store';
// import * as store                 from '../index';
import { ProductService, ReferenceService, CourierService } from '@belisada-seller/core/services';
import {
  ProductSuggestion
} from '@belisada-seller/core/models';
import { map, switchMap, catchError } from 'rxjs/operators';
/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application. StateUpdates is an observable of the latest state and
 * dispatched action. The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsApiClient: ProductService,
    private couerierApiClient: CourierService,
    private prodctWarranty: ReferenceService
    ) {}

  /**
   * Product details
   */
  @Effect()
  getProductDetails$: Observable<Action> = this.actions$.pipe(
    ofType(productDetailsActions.ActionTypes.LOAD),
    map((action: productDetailsActions.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.getProdListing(state).pipe(
        map(products => new productDetailsActions.LoadSuccessAction(products.data)),
        catchError(error  => of(new productDetailsActions.LoadFailAction()))

      );
    })
  );

  @Effect()
  getProductSearchMaster$: Observable<Action> = this.actions$.pipe(
    ofType(productSearchActions.ActionTypes.LOAD),
    map((action: productSearchActions.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.getProductSuggestion(state).pipe(
        map(products => new productSearchActions.LoadSuccessAction(products)),
        catchError(error  => of(new productSearchActions.LoadFailAction()))

      );
    })
  );


  @Effect()
  postProductReq$: Observable<Action> = this.actions$.pipe(
    ofType(prodReq.ActionTypes.LOAD),
    map((action: prodReq.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.prodReq(state).pipe(
        map(products => new prodReq.LoadSuccessAction(products)),
        catchError(error  => of(new prodReq.LoadFailAction()))
      );
    })
  );


  @Effect()
  getProdDetail$: Observable<Action> = this.actions$.pipe(
    ofType(proddetailAdd.ActionTypes.LOAD),
    map((action: proddetailAdd.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.getProdDetail(state).pipe(
        map(products => new proddetailAdd.LoadSuccessAction(products)),
        catchError(error  => of(new proddetailAdd.LoadFailAction()))
      );
    })
  );

  @Effect()
  getProdVariant$: Observable<Action> = this.actions$.pipe(
    ofType(prodVariant.ActionTypes.LOAD),
    map((action: prodVariant.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.getProdVariant(state).pipe(
        map(products => new prodVariant.LoadSuccessAction(products)),
        catchError(error  => of(new prodVariant.LoadFailAction()))
      );
    })
  );


  @Effect()
  getProductWarranty$: Observable<Action> = this.actions$.pipe(
    ofType(prodWarranty.ActionTypes.LOAD),
    map((action: prodWarranty.LoadAction) => action.payload),
    switchMap(state => {
      return this.prodctWarranty.getReference(state).pipe(
        map(products => new prodWarranty.LoadSuccessAction(products)),
        catchError(error  => of(new prodWarranty.LoadFailAction()))
      );
    })
  );
  @Effect()
  getProductWarrantyLong$: Observable<Action> = this.actions$.pipe(
    ofType(prodWarrantyLong.ActionTypes.LOAD),
    map((action: prodWarrantyLong.LoadAction) => action.payload),
    switchMap(state => {
      return this.prodctWarranty.getReference(state).pipe(
        map(products => new prodWarrantyLong.LoadSuccessAction(products)),
        catchError(error  => of(new prodWarrantyLong.LoadFailAction()))
      );
    })
  );


  @Effect()
  corueier$: Observable<Action> = this.actions$.pipe(
    ofType(courier.ActionTypes.LOAD),
    map((action: courier.LoadAction) => action.payload),
    switchMap(state => {
      return this.couerierApiClient.getCouriere(state).pipe(
        map(products => new courier.LoadSuccessAction(products)),
        catchError(error  => of(new courier.LoadFailAction()))
      );
    })
  );
  @Effect()
  postProductV2$: Observable<Action> = this.actions$.pipe(
    ofType(postV2.ActionTypes.LOAD),
    map((action: postV2.LoadAction) => action.payload),
    switchMap(state => {
      return this.productsApiClient.addProductV2(state).pipe(
        map(products => new postV2.LoadSuccessAction(products)),
        catchError(error  => of(new postV2.LoadFailAction()))
      );
    })
  );
}
