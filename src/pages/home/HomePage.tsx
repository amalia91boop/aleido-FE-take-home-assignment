import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laddar produkter...</p>;

  return (
    <div>
      <h1>Produkter</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
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

export default HomePage;