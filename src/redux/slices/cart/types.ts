export type TCartProducts = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  activeType: number;
  activeSizeId: number;
  count: number;
  idProduct: string;
};

export type TCartState = {
  totalPrice: number;
  items: TCartProducts[];
};

export type TChangeCountPayload = {
  idProduct: string;
  change: string;
};
