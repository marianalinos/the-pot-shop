import { useState } from "react";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: number, quantity: number) => void;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
  };

  return (
    <div className="card">
      <div className="image-container">{image}</div>
      <h3 className="name">{name}</h3>
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
