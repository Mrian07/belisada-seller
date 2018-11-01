/**
 * More info: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { ActionReducerMap, createSelector } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromProduct from './reducer/product-detail.reducer';
import * as fromProductSearch from './reducer/product-search.reducer';
import * as fromProductReq from './reducer/product-req.reducer';
import * as fromProdutAdd from './reducer/product-add.reducer';
import * as fromProdWarranty from './reducer/product-warranty.reducer';
import * as fromProdWarrantyLong from './reducer/product-warranty-long.reducer';
import * as fromProdVariant from './reducer/product-variant.reducer';
import * as courier from './reducer/courier.reducer';
import * as postProductV2 from './reducer/product-detail-post.reducer';
/**
 *
 * We treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  productDetails: fromProduct.State;
  productSearch: fromProductSearch.State;
  productReq: fromProductReq.State;
  prodAdd: fromProdutAdd.State;
  prodWarranty: fromProdWarranty.State;
  prodWarrantyLong: fromProdWarrantyLong.State;
  prodVariant: fromProdVariant.State;
  courier: courier.State;
  postProductV2: postProductV2.State;
}

export const reducers: ActionReducerMap<State> = {
  productDetails: fromProduct.reducer,
  productSearch: fromProductSearch.reducer,
  productReq: fromProductReq.reducer,
  prodAdd: fromProdutAdd.reducer,
  prodWarranty: fromProdWarranty.reducer,
  prodWarrantyLong: fromProdWarrantyLong.reducer,
  prodVariant: fromProdVariant.reducer,
  courier: courier.reducer,
  postProductV2: postProductV2.reducer,
};
 /**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 */


export const getProductsState   = (state: State) => state.productDetails;
export const getProductsLoaded  = createSelector(getProductsState, fromProduct.getLoaded);
export const getProductsLoading = createSelector(getProductsState, fromProduct.getLoading);
export const getProductsFailed  = createSelector(getProductsState, fromProduct.getFailed);
export const getProductsData    = createSelector(getProductsState, fromProduct.getData);




export const getProductsSearchState   = (state: State) => state.productSearch;
export const getProductsSearchLoaded  = createSelector(getProductsSearchState, fromProductSearch.getLoaded);
export const getProductsSearchLoading = createSelector(getProductsSearchState, fromProductSearch.getLoading);
export const getProductsSearchFailed  = createSelector(getProductsSearchState, fromProductSearch.getFailed);
export const getProductsSearchData    = createSelector(getProductsSearchState, fromProductSearch.getData);


export const getProductsreqState   = (state: State) => state.productReq;
export const getProductsreqLoaded  = createSelector(getProductsreqState, fromProductReq.getLoaded);
export const getProductsreqLoading = createSelector(getProductsreqState, fromProductReq.getLoading);
export const getProductsreqFailed  = createSelector(getProductsreqState, fromProductReq.getFailed);
export const getProductsreqData    = createSelector(getProductsreqState, fromProductReq.getData);

export const getProductAdd   = (state: State) => state.prodAdd;
export const getProductsAddLoaded  = createSelector(getProductAdd, fromProdutAdd.getLoaded);
export const getProductsAddLoading = createSelector(getProductAdd, fromProdutAdd.getLoading);
export const getProductsAddFailed  = createSelector(getProductAdd, fromProdutAdd.getFailed);
export const getProductsAddData    = createSelector(getProductAdd, fromProdutAdd.getData);


export const getProductWarranty   = (state: State) => state.prodWarranty;
export const getProductsWarrantyLoaded  = createSelector(getProductWarranty, fromProdWarranty.getLoaded);
export const getProductsWarrantyLoading = createSelector(getProductWarranty, fromProdWarranty.getLoading);
export const getProductsWarrantyFailed  = createSelector(getProductWarranty, fromProdWarranty.getFailed);
export const getProductsWarrantyData    = createSelector(getProductWarranty, fromProdWarranty.getData);

export const getProductWarrantyLong   = (state: State) => state.prodWarrantyLong;
export const getProductsWarrantyLongLoaded  = createSelector(getProductWarrantyLong, fromProdWarrantyLong.getLoaded);
export const getProductsWarrantyLongLoading = createSelector(getProductWarrantyLong, fromProdWarrantyLong.getLoading);
export const getProductsWarrantyLongFailed  = createSelector(getProductWarrantyLong, fromProdWarrantyLong.getFailed);
export const getProductsWarrantyLongData    = createSelector(getProductWarrantyLong, fromProdWarrantyLong.getData);


export const getProductVariant   = (state: State) => state.prodVariant;
export const getProductsVariantLoaded  = createSelector(getProductVariant, fromProdVariant.getLoaded);
export const getProductsVariantLoading = createSelector(getProductVariant, fromProdVariant.getLoading);
export const getProductsVariantFailed  = createSelector(getProductVariant, fromProdVariant.getFailed);
export const getProductsVariantData    = createSelector(getProductVariant, fromProdVariant.getData);


export const getCourier  = (state: State) => state.courier;
export const getCourierLoaded  = createSelector(getCourier, courier.getLoaded);
export const getCourierLoading = createSelector(getCourier, courier.getLoading);
export const getCourierFailed  = createSelector(getCourier, courier.getFailed);
export const getCourierData    = createSelector(getCourier, courier.getData);



export const PostProdV2   = (state: State) => state.postProductV2;
export const PostProdV2Loaded  = createSelector(PostProdV2, postProductV2.getLoaded);
export const PostProdV2Loading = createSelector(PostProdV2, postProductV2.getLoading);
export const PostProdV2Failed  = createSelector(PostProdV2, postProductV2.getFailed);
export const PostProdV2Data    = createSelector(PostProdV2, postProductV2.getData);
