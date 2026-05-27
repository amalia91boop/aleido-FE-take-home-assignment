import { useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <button onClick={() => navigate("/home")}>Hem</button>
      <button onClick={() => navigate("/search")}>Sök</button>
      <button onClick={() => navigate("/cart")}>
        Kundvagn ({totalItems})
      </button>
    </nav>
  );
}

export default Navbar;