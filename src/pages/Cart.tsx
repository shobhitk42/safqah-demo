import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, totalPoints, count } = useCart();

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Cart</h1>
        <span className="ml-auto text-xs text-muted-foreground">{count} {count === 1 ? "item" : "items"}</span>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-20 text-center">
          <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/merchandise")}
            className="h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            Browse Merchandise
          </button>
        </div>
      ) : (
        <>
      <div className="px-4 flex flex-col gap-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-xl bg-[#ECE8E3] p-3">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" loading="lazy" width={512} height={512} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">{item.name}</p>
              <p className="text-xs font-bold text-reward-gold mt-1">{item.points.toLocaleString()} pts</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-transparent"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3 text-muted-foreground" />
                </button>
                <span className="text-sm font-medium text-foreground">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-transparent"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-destructive/10"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mx-4 rounded-2xl bg-[#ECE8E3] p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">{totalPoints.toLocaleString()} pts</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Service Fee</span>
          <span className="text-foreground">0 pts</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="text-sm font-bold text-foreground">Total</span>
          <span className="text-sm font-bold text-reward-gold">{totalPoints.toLocaleString()} pts</span>
        </div>
        <button
          onClick={() => navigate("/checkout/cart")}
          className="w-full mt-4 flex items-center justify-center gap-2 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          Proceed to Checkout
        </button>
      </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
