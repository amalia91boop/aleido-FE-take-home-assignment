import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Laddar produkt...</p>;
  if (!product) return <p>Produkten hittades inte.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: "100%" }} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Lägg i kundvagn</button>
    </div>
  );
}

export default ProductPage;