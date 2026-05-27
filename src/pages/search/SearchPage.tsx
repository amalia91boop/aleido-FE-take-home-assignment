import { useState } from "react";
import { Link } from "react-router";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    setProducts(data.products);
    } catch {
       setError("Något gick fel, försök igen senare.");
    } finally {

    setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Sök produkter</h1>
      <div className="flex gap-2 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Sök efter produkt..."
          className="bg-white border border-peach-200 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-peach-500"
        />
        <button
          onClick={handleSearch}
          className="bg-peach-400 text-white px-6 py-2 rounded-lg hover:bg-peach-500 transition-colors"
        >
          Sök
        </button>
      </div>

      {loading && <p className="text-gray-500">Söker...</p>}
       {error && <p className="text-red-400">{error}</p>}

      {!loading && !error && products.length === 0 && query && (
        <p className="text-gray-500">Inga produkter hittades för "{query}"</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border border-peach-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
          >
            <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <h3 className="font-medium text-sm truncate">{product.title}</h3>
              <p className="text-peach-600 mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;