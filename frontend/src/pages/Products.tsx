import ProductCard from "../components/ProductComponent";
import { useState } from "react";

export default function Products() {
  const [products] = useState([
    { id: 1, name: "Poção", price: 20, image: "🧪" },
    { id: 2, name: "Espada", price: 100, image: "⚔️" },
  ]);

  const handleAddToCart = (id: number, quantity: number) => {
    console.log(`Adicionado: ID ${id}, Quantidade ${quantity}`);
  };

  return (
    <>
      <h1>PRODUTOS</h1>
      <img
        src="https://media.discordapp.net/attachments/825893479510966284/1374185788123775086/image.psd1.png?ex=682d21bf&is=682bd03f&hm=e26b290909758e8eea67c0dc4041d0b5a11604f30a08c574c8fa4375b7e0376d&=&format=webp&quality=lossless&width=1376&height=917"
        alt="imagem"
        className="products-image"
      />
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}
