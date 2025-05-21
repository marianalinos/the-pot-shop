import ProductCard from "../components/ProductComponent";
import { useState, useEffect } from "react";
import { getProducts, type Product } from "../api/products";

export default function Products() {
  const [productsI] = useState([
    { id: 1, name: "Poção", price: 20, image: "🧪" },
    { id: 2, name: "Espada", price: 100, image: "⚔️" },
  ]);

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  const handleAddToCart = (id: number, quantity: number) => {
    console.log(`Adicionado: ID ${id}, Quantidade ${quantity}`);
  };

  return (
    <>
      <h1>PRODUTOS</h1>
      <div className="products-container">
        {products ? (
          products.map((product) => (
            <ProductCard
              key={product.product_id}
              {...product}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </div>
    </>
  );
}
