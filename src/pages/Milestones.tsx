import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import MilestoneCard from "@/components/MilestoneCard";

const Milestones = () => {
  const navigate = useNavigate();
  const { user, role } = useUser();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  const list = user.milestones.filter((ms) => ms.role === role);
  const inProgress = list.filter((ms) => ms.current > 0 && ms.current < ms.target).length;
  const completed = list.filter((ms) => ms.current >= ms.target).length;

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="px-5 pt-5">
        <button onClick={() => navigate("/loyalty")} aria-label="Back" className="-ml-1 flex h-9 w-9 items-center justify-center">
          <ChevronLeft className="h-6 w-6 text-foreground" strokeWidth={1.5} />
        </button>
        <h1 className="mt-4 text-[22px] font-bold text-foreground">Milestones</h1>
        <p className="mt-1 text-[13px] text-foreground/60">
          Complete your account setup and invest on Safqah to unlock bonus points and rewards.
        </p>
        <p className="mt-3 text-[12px] font-medium text-foreground/70">
          {completed} of {list.length} completed · {inProgress} in progress
        </p>
      </div>

      <div className="mt-6 space-y-4 px-5">
        {list.map((ms, i) => (
          <MilestoneCard key={ms.id} ms={ms} visible={visible} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Milestones;
