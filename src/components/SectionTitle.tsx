import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

/** Shared home section heading: yellow accent bar, semibold title, optional muted subtitle and right-aligned action. */
const SectionTitle = ({ title, subtitle, action }: SectionTitleProps) => (
  <div className="mb-4 flex items-start justify-between gap-3">
    <div>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <span className="h-5 w-1 rounded-full bg-[#FCEE21]" />
        {title}
      </h2>
      {subtitle && <p className="mt-1 text-sm text-foreground/60">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default SectionTitle;
