import { useState } from "react";
import type { Product } from "../api/products";
import { addCartProduct } from "../api/cart-product";
import { useCustomer } from "../context/CustomerContext";

export default function ProductCard({
  product_id,
  product_name,
  price,
  image,
}: Product) {
  const [quantity, setQuantity] = useState(1);
  const { currentCart } = useCustomer();

  const handleAddToCart = async () => {
    try {

      await addCartProduct(currentCart?.cart_id ?? 1, product_id, quantity);
      alert("Essa poção tá na sacola!");
    } catch (error) {
      console.error("Erro ao adicionar produto na sacola:", error);
      alert("Falha ao adicionar produto na sacola");
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
        COLOCAR NA SACOLA
      </button>
    </div>
  );
}
