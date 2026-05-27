import { useCart } from "@/context/CartContext";

function CartPage() {
  const { items, totalItems } = useCart();

  if (items.length === 0) return <p>Din kundvagn är tom.</p>;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h1>Kundvagn ({totalItems} varor)</h1>
      {items.map((item) => (
        <div key={item.id} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
          <img src={item.thumbnail} alt={item.title} style={{ width: "80px" }} />
          <div>
            <h3>{item.title}</h3>
            <p>Antal: {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <h2>Totalt: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default CartPage;