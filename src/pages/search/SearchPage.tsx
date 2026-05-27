import { useState } from "react";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  return (
    <div>
      <h1>Sök produkter</h1>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Sök..."
          style={{ padding: "0.5rem", marginRight: "0.5rem", width: "300px" }}
        />
        <button onClick={handleSearch}>Sök</button>
      </div>

      {loading && <p>Söker...</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginTop: "1rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer", border: "1px solid #ddd", padding: "1rem" }}
          >
            <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;