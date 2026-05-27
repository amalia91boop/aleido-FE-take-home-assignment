import { Link, useLocation } from "react-router";
import { useCart } from "@/context/CartContext";

function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-peach-100 border-b border-peach-300 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Webshop
        </Link>
        <ul className="flex gap-6 list-none">
          <li>
            <Link to="/" className={`transition-colors pb-1 ${isActive("/") ? "text-peach-500 border-b-2 border-peach-400" : "text-gray-600 hover:text-peach-500"}`}>
              Hem
            </Link>
          </li>
          <li>
            <Link to="/search" className={`transition-colors pb-1 ${isActive("/search") ? "text-peach-500 border-b-2 border-peach-400" : "text-gray-600 hover:text-peach-500"}`}>
              Sök
            </Link>
          </li>
          <li>
            <Link to="/cart" className={`transition-colors pb-1 ${isActive("/cart") ? "text-peach-500 border-b-2 border-peach-400" : "text-gray-600 hover:text-peach-500"}`}>
              Kundvagn {totalItems > 0 && (
                <span className="bg-black text-white text-xs rounded-full px-2 py-0.5 ml-1">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;