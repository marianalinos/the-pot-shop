import ProductCard from "../components/ProductComponent";
import { useState, useEffect } from "react";
import { getProducts, type Product } from "../api/products";
import Header from "../components/Header";

export default function Products() {
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
      <Header />
      <div className="min-w-screen flex flex-col items-center justify-center">
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
      </div>
    </>
  );
}
