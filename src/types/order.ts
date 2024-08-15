export type Order = {
  _id: string;
  userId: string;
  orderId: string;
  orderItems: {
    qty: number;
    price: number;
    shippingPrice: number;
    subTotal: number;
    product: {
      productId: string;
      productTitle: string;
      productSlug: string;
      productBrand: string;
      partNumber: string;
      sku: string;
      merchant: any;
    };
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    companyName?: string;
    phone: number;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    companyName?: string;
    phone: number;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResponse: {
    txnId: string;
    status: string;
  };
  taxPrice: number;
  totalShippingPrice: number;
  totalQty: number;
  orderStatus: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  createdAt: string;
};
