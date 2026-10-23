import { useUser } from "@/contexts/UserContext";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const firstName = user.name.split(" ")[0];
  const isPlatinum = user.tier?.toLowerCase() === "platinum";

  return (
    <header className="relative px-5 pt-2 pb-8 stagger-item stagger-1">
      <div
        className="relative overflow-hidden rounded-[20px] bg-white px-5 py-6"
        style={{
          border: "1px solid #E8E8EE",
          boxShadow:
            "0 1px 2px rgba(26, 26, 46, 0.04), 0 8px 24px -12px rgba(26, 26, 46, 0.10)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full"
          style={{ backgroundColor: "rgba(2, 173, 76, 0.06)" }}
        />

        {/* Top row: logo */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[18px] font-bold"
              style={{ backgroundColor: "#FCEE21", color: "#302F2D" }}
            >
              S
            </div>
            <span
              className="text-[18px] leading-none tracking-tight"
              style={{
                fontFamily: "'IBM Plex Sans Arabic', sans-serif",
                fontWeight: 700,
                color: "#302F2D",
                letterSpacing: "-0.02em",
              }}
            >
              Safqah <span style={{ color: "#02AD4C" }}>Capital</span>
            </span>
          </div>
        </div>

        {/* Greeting — hero */}
        <div className="relative mt-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-[10px] uppercase"
            style={{
              color: "#02AD4C",
              fontWeight: 700,
              letterSpacing: "0.22em",
            }}
          >
            Welcome back
          </p>
          <h1
            className="mt-1.5 leading-[1.05]"
            style={{
              color: "#302F2D",
              fontFamily: "'IBM Plex Sans Arabic', sans-serif",
              fontWeight: 700,
              fontSize: "30px",
              letterSpacing: "-0.028em",
            }}
          >
            {firstName}
          </h1>
        </div>

        {/* Points */}
        <div className="shrink-0 text-right">
          <div>
            <p
              className="mb-1 text-[12px]"
              style={{ color: "#6B6B7A", fontWeight: 400 }}
            >
              Available to redeem
            </p>
            <div className="flex items-baseline justify-end gap-1.5">
              <span
                className="tabular-nums leading-none"
                style={{
                  color: "#302F2D",
                  fontWeight: 700,
                  fontSize: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                {user.availablePoints.toLocaleString()}
              </span>
              <span
                className="text-[11px] uppercase"
                style={{
                  color: "#6B6B7A",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                }}
              >
                pts
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
