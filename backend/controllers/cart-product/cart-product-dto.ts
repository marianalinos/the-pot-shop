export interface CreateCartProductDTO {
  cartId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartProductDTO {
  id: number;
  quantity: number;
}