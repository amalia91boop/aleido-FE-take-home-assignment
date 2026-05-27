import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Något gick fel, försök igen senare.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-20 text-gray-500">Laddar produkter...</p>;
    if (error) return <p className="text-center mt-20 text-red-400">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Produkter</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;