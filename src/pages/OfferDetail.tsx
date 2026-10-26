import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Tag, Check } from "lucide-react";
import { getOffer } from "@/data/offers";
import { useUser } from "@/contexts/UserContext";

const OfferDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const offer = slug ? getOffer(slug) : undefined;
  const { user } = useUser();

  const [stage, setStage] = useState<"detail" | "confirm" | "success">("detail");
  const [balance, setBalance] = useState(user.wallets.consumer.redeemable);

  if (!offer) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-md px-4 pt-10">
          <button
            onClick={() => navigate("/offers")}
            className="inline-flex items-center gap-1 text-[13px] text-[#02AD4C]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to offers
          </button>
          <p className="mt-6 text-[14px] text-[#302F2D]">Offer not found.</p>
        </div>
      </div>
    );
  }

  const REDEEM_COST = offer.cost;
  const insufficient = balance < REDEEM_COST;
  const after = balance - REDEEM_COST;

  const handleActivate = () => setStage("confirm");
  const handleConfirm = () => {
    setBalance((b) => b - REDEEM_COST);
    setStage("success");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto w-full max-w-md">
        {/* Hero */}
        <div className="relative">
          <img
            src={offer.image}
            alt={offer.brand}
            width={800}
            height={800}
            className={`w-full h-[220px] ${offer.image.startsWith("http") ? "object-contain bg-white" : "object-cover"}`}
          />
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="absolute top-4 left-4 h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/95 shadow-md"
          >
            <ArrowLeft className="h-4 w-4 text-[#302F2D]" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 pt-5">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F6EC]">
              <Tag className="h-3 w-3 text-[#02AD4C]" strokeWidth={2} />
            </span>
            <span className="text-[13px] font-medium text-[#302F2D]">
              {offer.brand}
            </span>
          </div>

          <h1 className="text-[18px] font-bold text-[#302F2D] leading-snug">
            {offer.headline}
          </h1>
          <p className="mt-2 text-[14px] font-semibold text-[#02AD4C]">
            {offer.value}
          </p>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">Valid until {offer.validUntil ?? "31 Aug 2026"}</p>

          <p className="mt-5 text-[13px] leading-relaxed text-[#302F2D]/80">
            {offer.description}
          </p>

          {offer.howTo && (
            <div className="mt-6">
              <h2 className="text-[13px] font-bold text-[#302F2D]">How to use</h2>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-[#302F2D]/80">
                {offer.howTo.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          )}
          {offer.terms && (
            <div className="mt-5">
              <h2 className="text-[13px] font-bold text-[#302F2D]">Terms</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-[#302F2D]/80">
                {offer.terms.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}

          {/* Balance chip */}
          <div className="mt-6 rounded-xl border border-[#E8E8EE] bg-white p-4">
            <div className="flex items-center justify-between text-[12px] text-[#6B6B7A]">
              <span>Cost</span>
              <span className="tabular-nums font-semibold text-[#302F2D]">
                {REDEEM_COST === 0 ? "Free" : `${REDEEM_COST.toLocaleString()} pts`}
              </span>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[12px] text-[#6B6B7A]">
              <span>Your redeemable balance</span>
              <span className="tabular-nums font-semibold" style={{ color: "#02AD4C" }}>
                {balance.toLocaleString()} pts
              </span>
            </div>
            {insufficient && (
              <p className="mt-3 text-[12px] font-medium" style={{ color: "#B8863F" }}>
                Insufficient redeemable points. You need{" "}
                {(REDEEM_COST - balance).toLocaleString()} more points to redeem this offer.
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleActivate}
            disabled={insufficient}
            className="mt-6 w-full rounded-xl bg-[#02AD4C] py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Activate Offer
          </button>

          <p className="mt-3 text-center text-[11px] text-[#9CA3AF]">
            Terms &amp; conditions apply
          </p>
        </div>
      </div>

      {/* Confirmation modal */}
      {stage === "confirm" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-white p-6">
            <h3 className="text-[16px] font-bold text-[#302F2D]">
              Redeem {offer.brand}?
            </h3>
            <div className="mt-4 space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-[#6B6B7A]">Cost</span>
                <span className="tabular-nums font-semibold text-[#302F2D]">
                  {REDEEM_COST === 0 ? "Free" : `${REDEEM_COST.toLocaleString()} pts`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B7A]">Your balance</span>
                <span className="tabular-nums font-semibold text-[#302F2D]">
                  {balance.toLocaleString()} pts <span className="text-[11px] text-[#9CA3AF] font-normal">(Redeemable)</span>
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E8E8EE]">
                <span className="text-[#6B6B7A]">After redeem</span>
                <span className="tabular-nums font-bold" style={{ color: "#02AD4C" }}>
                  {after.toLocaleString()} pts
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStage("detail")}
                className="flex-1 h-12 rounded-[10px] border border-[#CFCBD0] bg-transparent px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary/5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success state */}
      {stage === "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full animate-scale-in"
              style={{ backgroundColor: "#02AD4C" }}
            >
              <Check className="h-7 w-7 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-[17px] font-bold text-[#302F2D]">Redeemed successfully!</h3>
            <p className="mt-2 text-[13px] text-[#6B6B7A]">
              New balance:{" "}
              <span className="font-semibold" style={{ color: "#02AD4C" }}>
                {balance.toLocaleString()} pts
              </span>
            </p>
            <button
              onClick={() => navigate("/offers")}
              className="mt-6 w-full h-12 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              Back to offers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferDetail;
