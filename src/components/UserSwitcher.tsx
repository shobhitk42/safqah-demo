import { useUser, Role } from "@/contexts/UserContext";

const UserSwitcher = () => {
  const { role, setRole } = useUser();

  const roles: { id: Role; name: string }[] = [
    { id: "consumer", name: "Consumer" },
    { id: "merchant", name: "Merchant" },
  ];

  const activeIndex = roles.findIndex((r) => r.id === role);

  return (
    <div className="relative z-10 -mt-6 mx-5 mb-6 stagger-item stagger-2">
      <p
        className="mb-2 text-[10px] uppercase"
        style={{ color: "#6B6B7A", fontWeight: 600, letterSpacing: "0.18em" }}
      >
        View Ahmed as
      </p>
      <div
        role="tablist"
        aria-label="Switch role"
        className="relative flex items-center rounded-2xl p-1"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E8E8EE",
          boxShadow: "0 8px 24px -12px rgba(26, 26, 46, 0.12)",
        }}
      >
        <span
          aria-hidden
          className="absolute top-1 bottom-1 rounded-xl"
          style={{
            width: `calc(50% - 4px)`,
            left: 4,
            transform: `translateX(${activeIndex * 100}%)`,
            transition: "transform 260ms cubic-bezier(0.23, 1, 0.32, 1)",
            backgroundColor: "#2B8CA8",
          }}
        />
        {roles.map((r) => {
          const active = role === r.id;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={active}
              onClick={() => setRole(r.id)}
              className="relative z-10 flex-1 py-2.5 text-[13px]"
              style={{
                color: active ? "#FFFFFF" : "#9CA3AF",
                fontWeight: active ? 600 : 500,
                letterSpacing: "0.02em",
                transition: "color 200ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {r.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserSwitcher;
