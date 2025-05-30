import { useState } from "react";
import type { Product } from "../api/products";
import { addCartProduct } from "../api/cart-product";

export default function ProductCard({
  product_id,
  product_name,
  price,
  image,
}: Product) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const cart_id = 1;

      await addCartProduct(cart_id, product_id, quantity);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="card">
      <img src={image} alt={product_name} />
      <h3 className="name">{product_name}</h3>
      <p className="price">{Number(price)}G</p>
      <div className="quantity-container">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="quantity-button"
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="quantity-button"
        >
          +
        </button>
      </div>

      <button onClick={handleAddToCart} className="add-button">
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
}
