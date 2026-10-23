import { useEffect, useState } from "react";
import { X, Building2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const content = {
  merchant: {
    label: "Because you're a Growth Partner",
    message: "Your store processed 1,240 transactions this month — you've earned bonus merchant points.",
    slug: "cleartrip-flight",
  },
  consumer: {
    label: "Because you're a City Spender",
    message: "You've made 47 transactions this month — unlock a dining reward before it expires.",
    slug: "talabat-dining",
  },
} as const;

const ConciergeNotification = () => {
  const { activeUser } = useUser();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setVisible(false);
    setDismissed(false);
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, [activeUser]);

  const handleView = () => {
    setVisible(false);
    setDismissed(true);
    navigate(`/concierge/${content[activeUser].slug}`, {
      state: { fromNotification: true },
    });
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  if (dismissed && !visible) return null;

  const { label, message } = content[activeUser];

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-[56px] z-40 mx-auto flex max-w-md justify-center px-4 pb-4 pt-24 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background:
          "linear-gradient(to top, hsl(var(--background)) 35%, hsl(var(--background) / 0) 100%)",
      }}
      aria-hidden={!visible}
    >
      <div
        role="dialog"
        aria-live="polite"
        onClick={handleView}
        className={`pointer-events-auto relative w-full cursor-pointer overflow-hidden bg-white px-5 py-5 transition-all duration-[400ms] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{
          border: "1px solid #E8E8EE",
          borderRadius: "16px",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); handleDismiss(); }}
          aria-label="Dismiss notification"
          className="absolute right-4 top-4"
          style={{ color: "#8A8A98" }}
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        <div className="mb-2 flex items-center gap-2">
          {activeUser === "consumer" ? (
            <Building2 className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: "#2B8CA8" }} />
          ) : (
            <Send className="h-3.5 w-3.5" strokeWidth={1.5} style={{ color: "#2B8CA8" }} />
          )}
          <p
            className="text-[10px] uppercase"
            style={{ color: "#2B8CA8", fontWeight: 600, letterSpacing: "0.05em" }}
          >
            Curated for you
          </p>
        </div>


        <p
          className="mb-4 pr-6 text-[14px] leading-relaxed"
          style={{ color: "#1A1A2E", fontWeight: 400 }}
        >
          {message}
        </p>

        <button
          onClick={(e) => { e.stopPropagation(); handleView(); }}
          className="text-[11px] uppercase tracking-[0.14em]"
          style={{ color: "#2B8CA8", fontWeight: 600 }}
        >
          View benefit →
        </button>
      </div>
    </div>
  );
};

export default ConciergeNotification;