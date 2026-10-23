import { ReactNode } from "react";
import { ArrowRight, LucideIcon } from "lucide-react";

interface BannerProps {
  title: string;
  subtitle?: string;
  cta?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
}

/** Green Safqah banner: bold white title, soft "Learn more" link, cropped seal emblem bottom-right. */
const Banner = ({ title, subtitle, cta, onClick, icon: Icon, className = "", children }: BannerProps) => {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`safqah-banner block w-full rounded-2xl px-6 py-6 text-left ${className}`}
    >
      {Icon && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-9 -right-7 flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-white/90"
        >
          <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/60">
            <Icon className="h-9 w-9 text-white" strokeWidth={1.5} />
          </span>
        </span>
      )}
      <h3 className="relative max-w-[240px] text-[22px] font-bold leading-[1.15]">{title}</h3>
      {subtitle && <p className="relative mt-2 max-w-[240px] text-[13px] leading-snug text-white">{subtitle}</p>}
      {children}
      {cta && <span className="relative mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </span>}
    </Tag>
  );
};

export default Banner;
