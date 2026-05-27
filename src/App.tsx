import { Outlet } from "react-router";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-peach-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;