import { CartProduct } from "@/types/cartProduct";
import { Product } from "@/types/product";
import { StateCreator } from "zustand";

type CartState = {
  products: CartProduct[];
  shippingTotal: number;
  taxTotal: number;
  totalAmt: number;
};

type CartActions = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  incQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProdductById: (productId: string) => CartProduct | undefined;
  setTaxAmt: (taxAmt: number) => void;
  setTotalAmt: (totalAmt: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState: CartState = {
  products: [],
  shippingTotal: 0.0,
  taxTotal: 0.0,
  totalAmt: 0.0,
};

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,
  incQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.productId === productId
      );
      if (foundProduct) {
        foundProduct.qty += 1;
      }
    }),
  decQty: (productId) =>
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.productId === productId
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
        }
      }
    }),
  addProduct: (product) =>
    set((state) => {
      state.products.push({ ...product, qty: 1 });
    }),
  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.productId !== productId
      );
    }),
  getProdductById: (productId) =>
    get().products.find((product) => product.productId === productId),
  setTaxAmt: (amount) =>
    set((state) => {
      state.taxTotal = amount;
    }),
  setTotalAmt: (total) =>
    set((state) => {
      state.totalAmt = total;
    }),
  reset: () => set(() => initialState),
});
