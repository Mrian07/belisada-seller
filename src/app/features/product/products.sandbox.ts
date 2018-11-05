import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as store from '../../core/store';
import * as productDetailsActions from '../../core/store/actions/product.actions';
import * as productSearchsActions from '../../core/store/actions/product-search.action';
import * as productReq from '../../core/store/actions/product-req.action';
import * as productAdd from '../../core/store/actions/product-detail.action';
import * as productWarranty from '../../core/store/actions/product-warranty.action';
import * as productWarrantyLong from '../../core/store/actions/product-warranty-long.action';
import * as productVariant from '../../core/store/actions/product-variant.action';
import * as corueri from '../../core/store/actions/courier.action';
import * as postProductV2 from '../../core/store/actions/product-detail-post.action';
import * as getProductForEdit from '../../core/store/actions/product-edit-action';
import {
  ProductListing, ProductDetailList, ProductDetailData, ProdReq, AddProductRequest, ProductCreate
} from '@belisada-seller/core/models';
import { ProductService } from '@belisada-seller/core/services';

@Injectable()
export class ProductsSandbox {

  public products$              = this.appState$.select(store.getProductsData);
  public productsLoading$       = this.appState$.select(store.getProductsLoading);

  public productSearch$         = this.appState$.select(store.getProductsSearchData);
  public productsSearchLoading$       = this.appState$.select(store.getProductsSearchLoading);

  public productRequest$         = this.appState$.select(store.getProductsreqData);
  public productRequestLoading$  = this.appState$.select(store.getProductsreqLoading);

  public productAdd$         = this.appState$.select(store.getProductsAddData);
  public productAddLoading$  = this.appState$.select(store.getProductsAddLoading);

  public productWarranty$         = this.appState$.select(store.getProductsWarrantyData);
  public productWarrantyLoading$  = this.appState$.select(store.getProductsWarrantyLoading);

  public productWarrantyLong$         = this.appState$.select(store.getProductsWarrantyLongData);
  public productWarrantyLongLoading$  = this.appState$.select(store.getProductsWarrantyLongLoading);


  public productVaraiant$         = this.appState$.select(store.getProductsVariantData);
  public productVaraiantLoading$  = this.appState$.select(store.getProductsVariantLoading);

  public coruerir$         = this.appState$.select(store.getCourierData);
  public coruerirLoading$  = this.appState$.select(store.getCourierLoading);


  public productAddV2$         = this.appState$.select(store.PostProdV2Data);
  public productAddV2Loading$  = this.appState$.select(store.PostProdV2Loading);

  public getProductDetailForPost$         = this.appState$.select(store.getProdDetailForEditData);
  public getProductDetailForPostLoading$  = this.appState$.select(store.getProdDetailForEditLoading);


  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState$: Store<store.State>,
    private productsApiClient: ProductService
  ) {
    this.registerEvents();
    this.unregisterEvents();
  }

  /**
   * Loads products from the server
   */
  public loadProducts(qparam): void {
    this.appState$.dispatch(new productDetailsActions.LoadAction(qparam));
  }

  public getProductSearch(qparam) {
    this.appState$.dispatch(new productSearchsActions.LoadAction(qparam));
  }

  public reqProduct(product: ProdReq): void {
    this.appState$.dispatch(new productReq.LoadAction(product));
  }

  public productAdd(product: number): void {
    this.appState$.dispatch(new productAdd.LoadAction(product));
  }

  public productWarranty(id: any): void {
    this.appState$.dispatch(new productWarranty.LoadAction(id));
  }

  public productWarrantyLong(id: any): void {
    this.appState$.dispatch(new productWarrantyLong.LoadAction(id));
  }

  public productVariant(product: number): void {
    this.appState$.dispatch(new productVariant.LoadAction(product));
  }

  public courier(): void {
    this.appState$.dispatch(new corueri.LoadAction());
  }

  public postProdV2(data: ProductCreate): void {
    this.appState$.dispatch(new postProductV2.LoadAction(data));
  }

  public getProductDetailForEdit(id): void {
    this.appState$.dispatch(new getProductForEdit.LoadAction(id));
  }




  /**
   * Loads product details from the server
   */
  // public loadProductDetails(id: number): void {
  //   this.appState$.dispatch(new productDetailsActions.LoadAction(id));
  // }

  /**
   * Dispatches an action to select product details
   */
  // public selectProduct(product: Product): void {
  //   this.appState$.dispatch(new productDetailsActions.LoadSuccessAction(product));
  // }

  /**
   * Unsubscribes from events
   */
  public unregisterEvents() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  private registerEvents(): void {
    // Subscribes to culture
    const queryParams = {
      code: 'GRT'
    };
    const queryParamsTwo = {
      code: 'GTI'
    };
    this.productWarranty(queryParams);
    this.productWarrantyLong(queryParamsTwo);
    // this.getProductSearch(qparam);
    // this.productAdd('2233');
    // this.getProductSearch('samsung');
  }
}
