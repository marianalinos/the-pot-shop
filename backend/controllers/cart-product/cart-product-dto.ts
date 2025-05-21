export interface CreateCartProductDTO {
  cart_id: number;
  product_id: number;
  quantity: number;
}

export interface UpdateCartProductDTO {
  cart_product_id: number;
  product_id: number;
  quantity: number;
}