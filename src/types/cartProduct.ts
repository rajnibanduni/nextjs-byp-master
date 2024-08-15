import { Product } from "./product";

export type CartProduct = Product & { qty: number };

export type CartItem = {
  product: Product;
  qty: number;
  shippingPrice: number;
};

export type Cart = {
  items: {
    [key: string]: CartItem;
  };
  totalQty: number;
  subTotal: number;
  tax: number;
  totalShippingPrice: number;
  totalAmount: number;
  stateCode: string;
};
