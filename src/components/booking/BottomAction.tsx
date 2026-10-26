import { ReactNode } from "react";

interface BottomActionProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  /** Small line shown above the button, e.g. the running total. */
  hint?: ReactNode;
}

/** Fixed bottom primary CTA, matching the app-wide bottom button style. */
const BottomAction = ({ label, onClick, disabled, hint }: BottomActionProps) => (
  <div className="fixed bottom-[56px] left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-background px-5 pb-4 pt-3">
    {hint && <div className="mb-2 flex items-center justify-between text-[13px]">{hint}</div>}
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-[52px] w-full rounded-xl bg-primary px-5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
    >
      {label}
    </button>
  </div>
);

export default BottomAction;
