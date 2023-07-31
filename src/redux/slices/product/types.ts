export type TProduct = {
  id: number;
  imageUrl: string;
  title: string;
  types: [0, 1];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export type TProductsState = {
  products: TProduct[];
  isLoading: boolean;
  productsNumber: number;
  error: string;
};

export type TFetchProducts = {
  products: TProduct[];
  productsNumber: string | undefined;
};
