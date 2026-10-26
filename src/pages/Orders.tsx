import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Gift, Plane, ShoppingBag, Sparkles } from "lucide-react";
import { useBookings } from "@/contexts/BookingsContext";

const staticOrders = [
  { id: "ORD-20260402", item: "eXtra Gift Card", category: "Gift Card", points: 2500, date: "Apr 2, 2026", status: "Delivered", icon: Gift },
  { id: "ORD-20260322", item: "PlayStation Network KSA", category: "Gift Card", points: 5000, date: "Mar 22, 2026", status: "Delivered", icon: Gift },
  { id: "ORD-20260315", item: "JBL Flip 6 Speaker", category: "Electronics", points: 12000, date: "Mar 15, 2026", status: "Shipped", icon: Package },
  { id: "ORD-20260310", item: "Riyadh – Istanbul Flight", category: "Travel", points: 18000, date: "Mar 10, 2026", status: "Confirmed", icon: Plane },
  { id: "ORD-20260305", item: "Carrefour Gift Card", category: "Gift Card", points: 1500, date: "Mar 5, 2026", status: "Delivered", icon: Gift },
  { id: "ORD-20260228", item: "Nike Running Shoes", category: "Merchandise", points: 8500, date: "Feb 28, 2026", status: "Delivered", icon: ShoppingBag },
  { id: "ORD-20260220", item: "IKEA Gift Card", category: "Gift Card", points: 3000, date: "Feb 20, 2026", status: "Delivered", icon: Gift },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Confirmed: "bg-amber-100 text-amber-700",
  Processing: "bg-muted text-muted-foreground",
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { bookings } = useBookings();

  const orders = [
    ...bookings.map((b) => ({
      id: b.id,
      item: b.item,
      category: b.category,
      points: b.points,
      date: b.date,
      status: b.status,
      icon: Sparkles,
    })),
    ...staticOrders,
  ];

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-20">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/profile")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">My Orders</h1>
        <span className="ml-auto text-xs text-muted-foreground">{orders.length} orders</span>
      </div>

      <div className="px-4 flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl bg-[#ECE8E3] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                <order.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{order.item}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{order.category} • {order.id}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs font-bold text-reward-gold">{order.points.toLocaleString()} pts</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || statusColor.Processing}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{order.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
