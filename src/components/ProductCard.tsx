import { Link } from "react-router";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}


function ProductCard({ product } : {product: Product}) {
  const { addToCart } = useCart();

  return (
    <div className="border border-peach-200 rounded-lg overflow-hidden bg-white flex flex-col">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover" />
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{product.title}</h3>
          <p className="text-peach-500 mt-1">${product.price}</p>
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
  );
}

export default ProductCard;