import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCart } from "@/context/CartContext";

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
  const { addToCart } = useCart();

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
          <div key={product.id} className="border border-peach-200 rounded-lg overflow-hidden bg-white flex flex-col hover:shadow shadow-peach-400">
          <Link
            to={`/product/${product.id}`}
            key={product.id}
          >
            <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{product.title}</h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
            </div>
          </Link>
            <div className="px-3 pb-3 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-peach-400 text-white text-sm py-2 rounded-lg hover:bg-peach-500 transition-colors"
              >
                Lägg i kundvagn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;