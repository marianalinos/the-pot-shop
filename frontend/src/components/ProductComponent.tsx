import { useState } from "react";
import type { Product } from "../api/products";

export default function ProductCard({
  product_id,
  product_name,
  price,
  image,
}: Product) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product_id, quantity);
  };

  return (
    <div className="card">
      <div className="image-container">{image}</div>
      <h3 className="name">{product_name}</h3>
      <p className="price">R$ {price.toFixed(2)}</p>

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
