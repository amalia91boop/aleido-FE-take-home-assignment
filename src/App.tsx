import { Outlet } from "react-router";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Outlet />
    </CartProvider>
  );
}

export default App;