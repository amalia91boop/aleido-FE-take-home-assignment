import { Link } from "react-router";
import { useCart } from "@/context/CartContext";

function CartPage() {
  const { items, totalItems, removeFromCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) return (
    <div className="text-center mt-20">
      <p className="text-gray-500 text-xl mb-4">Din kundvagn är tom.</p>
      <Link to="/home" className="bg-peach-400 text-white px-6 py-3 rounded-lg hover:bg-peach-500 transition-colors">
        Fortsätt handla
      </Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Kundvagn ({totalItems} varor)</h1>
      <div className="bg-peach-100 rounded-lg border border-peach-200 overflow-hidden mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border-b border-peach-100 last:border-0">
            <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-500 text-sm">Antal: {item.quantity}</p>
              <p className="font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="bg-peach-400 text-white text-s px-3 py-1 rounded-lg hover:bg-peach-500 transition-colors self-center">Ta bort</button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Totalt: ${total.toFixed(2)}</p>
        <button className="bg-peach-400 text-white px-6 py-3 rounded-lg hover:bg-peach-500 transition-colors">
          Till kassan
        </button>
      </div>
    </div>
  );
}

export default CartPage;