export class ListingOrder {
    buyerEmail: string;
    buyerName: string;
    createdTime: string;
    expiredTime: string;
    grandTotal: number;
    imageUrl: string;
    invoiceNumber: string;
    paymentMethod: string;
    paymentMethodCode: string;
    paymentNumber: string;
    status: string;
    statusCode: string;
    transaction: Transaction[];
    transactionId: number;
}

export class Transaction {
    cart: Cart[];
    grandTotal: number;
}

export class Cart {
    alamatPenerima: string;
    alamatSebagai: string;
    asuransi: number;
    buyerName: string;
    cartItems: CartItems[];
    courierCode: string;
    courierName: string;
    courierPrice: number;
    courierService: string;
    createdOrder: string;
    expiredSellerProcessDate: string;
    countdown: Countdown;
    destinationId: number;
    destinations: Destinations[];
    invoiceNumber: string;

    namaPenerima: string;
    noResi: string;
    orderNumber: string;
    originId: number;
    paymentMethod: string;
    paymentNumber: string;
    phonePenerima: string;

    shipNumber: string;
    shippingAddressId: number;
    statusOrder: string;
    statusOrderCode: string;
    statusTracking: string;
    storeId: number;
    storeName: string;
    storeUrl: string;
    subTotal: number;
    total: number;
    totalWeight: number;
    useAsuransi: boolean;
}

export class Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  status: number;
  message: string;
}

export class Destinations {
    destinationId: number;
    name: string;
    shippingAddressId: number;

}

export class CartItems {
    courierCode: string;
    courierPrice: number;
    courierService: string;
    imageUrl: string;
    itemCartId: number;
    name: string;
    note: string;
    priceList: number;
    productId: number;
    quantity: number;
    specialPrice: number;
    subtotal: number;
    total: number;
    totalWeight: number;
    weightPerItem: number;
}

export class ListOrderSellerResponse {
    content: Cart[];
    last: Boolean;
    totalPages: number;
    totalElements: number;
    first: true;
    numberOfElements: number;
    size: number;
    number: number;
}


export class Invoice {
    status: string;
    message: string;
    data: InvoiceData;
}

export class InvoiceData {
    alamatPenerima: string;
    alamatSebagai: string;
    asuransi: number;
    courierCode: string;
    courierPrice: string;
    courierService: string;
    createdOrder: string;
    destinationId: number;
    invoiceNumber: string;
    namaPenerima: string;
    paymentNumber: string;
    paymentMethod: string;
    storeName: string;
    buyerName: string;
    useAsuransi: boolean;
    totalWeight: string;
    total: string;
    noResi: string;
    actualCourierPrice: number;
    cartItems: InvoiceCart[];
}

export class InvoiceCart {

}

export class Resi {
    actualCourierPrice: number;
    noResi: string;
    orderNumber: string;
    status: number;
}


export class ShippingData {
    status: number;
    message: string;
    data: ShippingListData;
}

export class ShippingListData {
    storeName: string;
    namaPenerima: string;
    phonePenerima: string;
    alamatPenerima: string;
    address: string;
    packingKayu: string;
    asuransi: string;
    courierName: string;
    courierService: string;
}
