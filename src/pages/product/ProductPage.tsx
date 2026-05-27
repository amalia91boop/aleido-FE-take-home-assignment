import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Något gick fel, försök igen senare.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Laddar produkt...</p>;
    if (error) return <p className="text-center mt-20 text-red-400">{error}</p>;
  if (!product) return <p className="text-center mt-20 text-gray-500">Produkten hittades inte.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-peach-500 hover:text-peach-600 mb-6 flex items-center gap-1 transition-colors"
      >
        ← Tillbaka
      </button>
      <div className="bg-white rounded-lg border border-peach-200 overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="w-full aspect-video object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-peach-500 mb-6">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              added
                ? "bg-green-500 text-white"
                : "bg-peach-400 text-white hover:bg-peach-500"
            }`}
          >
            {added ? "✓ Lagd i kundvagn!" : "Lägg i kundvagn"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;