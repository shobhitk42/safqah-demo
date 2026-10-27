import { useState } from "react";
import { STOREFRONT_RATE, cashOf, priceText, type PaymentResult } from "@/lib/pricing";
import PaymentStep from "@/components/booking/PaymentStep";
import BookingConfirmation from "@/components/booking/BookingConfirmation";
import BookingHeader from "@/components/booking/BookingHeader";
import { makeReference } from "@/components/booking/hotelData";
import { useBookings } from "@/contexts/BookingsContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { live } from "@/data/live";
import DealCard from "@/components/DealCard";
import animalsImg from "@/assets/donate-animals.jpg";
import foodImg from "@/assets/donate-food.jpg";
import educationImg from "@/assets/donate-education.jpg";
import environmentImg from "@/assets/donate-environment.jpg";
import hduImg from "@/assets/don-hdu.jpg";
import birdsImg from "@/assets/don-birds-trauma.jpg";
import streetImg from "@/assets/don-street.jpg";
import falconImg from "@/assets/don-falcon.jpg";
import spayImg from "@/assets/don-spay.jpg";
import disabledDogImg from "@/assets/don-disabled-dog.jpg";
import mobileVetImg from "@/assets/don-mobile-vet.jpg";
import workingAnimalsImg from "@/assets/don-working-animals.jpg";
import foodKitImg from "@/assets/don-foodkit.jpg";
import mealsImg from "@/assets/don-meals.jpg";
import medicalImg from "@/assets/don-medical.jpg";
import schoolKitImg from "@/assets/don-schoolkit.jpg";
import studentImg from "@/assets/don-student.jpg";
import digitalImg from "@/assets/don-digital.jpg";
import mangroveImg from "@/assets/don-mangrove.jpg";
import turtleImg from "@/assets/don-turtle.jpg";
import solarImg from "@/assets/don-solar.jpg";

const categories = [
  { id: "animals", label: "Animal Welfare", image: animalsImg },
  { id: "humanitarian", label: "Humanitarian", image: foodImg },
  { id: "education", label: "Education", image: educationImg },
  { id: "environment", label: "Environment", image: environmentImg },
] as const;

type CategoryId = (typeof categories)[number]["id"];

interface Campaign {
  id: string;
  category: CategoryId;
  title: string;
  org: string;
  location: string;
  image: string;
  // Real campaigns carry a description, terms and a points range (min to max)
  description?: string;
  terms?: string[];
  min?: number;
  max?: number;
}

const campaigns: Campaign[] = [
  // Animal Welfare — Saudi Arabia
  { id: "hdu", category: "animals", title: "High Dependency Unit for vulnerable sick animals", org: "Riyadh Animal Rescue Centre", location: "Al Malaz, Riyadh", image: hduImg },
  { id: "stray-trauma", category: "animals", title: "Trauma care centre for stray animals and birds", org: "K9 Friends Riyadh", location: "Al Olaya, Riyadh", image: birdsImg },
  { id: "street-animals", category: "animals", title: "Rescue sick & injured street animals across Riyadh", org: "Stray Animals Care Centre", location: "Riyadh & Central Region", image: streetImg },
  { id: "falcon-birds", category: "animals", title: "Protect endangered desert birds and falcons", org: "Saudi Falcons Conservation Reserve", location: "Thumamah, Riyadh", image: falconImg },
  { id: "spay-neuter", category: "animals", title: "Spay & neuter 5,000 stray cats and dogs", org: "Animal Welfare Riyadh", location: "Riyadh", image: spayImg },
  { id: "disabled-dogs", category: "animals", title: "Lifelong care for disabled dogs in a new shelter", org: "Paws & Claws Shelter", location: "Al Nakheel, Riyadh", image: disabledDogImg },
  { id: "care-wheels", category: "animals", title: "Animal care on wheels — mobile vet ambulance", org: "Riyadh Municipality Vet Services", location: "Riyadh", image: mobileVetImg },
  { id: "working-animals", category: "animals", title: "Help working camels and horses in desperate need", org: "Saudi Equine Welfare", location: "Riyadh Outskirts", image: workingAnimalsImg },

  // Humanitarian
  { id: "food-kit", category: "humanitarian", title: "Food kits for labour camp workers", org: "Ehsan Charity Platform", location: "Al Batha, Riyadh", image: foodKitImg },
  { id: "iftar", category: "humanitarian", title: "10,000 hot meals for families in need", org: "Itaam Saudi Food Bank", location: "Riyadh", image: mealsImg },
  { id: "medical-aid", category: "humanitarian", title: "Emergency medical aid for low-income patients", org: "Riyadh Charity Association", location: "Al Murabba, Riyadh", image: medicalImg },

  // Education
  { id: "school-kits", category: "education", title: "School kits for 1,000 underprivileged children", org: "Sanad Education Initiative", location: "Riyadh", image: schoolKitImg },
  { id: "sponsor-student", category: "education", title: "Sponsor a student's full academic year", org: "Scholars Foundation", location: "King Abdullah Financial District, Riyadh", image: studentImg },
  { id: "digital-learning", category: "education", title: "Tablets & digital learning for people of determination", org: "Centre for People with Disabilities", location: "Al Wurud, Riyadh", image: digitalImg },

  // Environment
  { id: "mangroves", category: "environment", title: "Plant 10,000 mangroves along the Red Sea coast", org: "Saudi Green Initiative", location: "Jeddah", image: mangroveImg },
  { id: "beach-clean", category: "environment", title: "Clean Jeddah's beaches and protect marine turtles", org: "Red Sea Turtle Rehabilitation Project", location: "Jeddah Corniche", image: turtleImg },
  { id: "solar", category: "environment", title: "Solar power for community shelters", org: "Saudi Green Building Council", location: "Riyadh", image: solarImg },
];

const amountOptions = [500, 1000, 2500, 5000];

const liveCategory = (c: string): CategoryId => {
  const k = c.toLowerCase();
  if (k.includes("educat")) return "education";
  if (k.includes("animal")) return "animals";
  if (k.includes("environ")) return "environment";
  return "humanitarian";
};
const liveCampaigns: Campaign[] = live.charity.map((p) => ({
  id: String(p.id),
  category: liveCategory(p.category),
  title: p.name,
  org: "Global Giving",
  location: p.country || "Saudi Arabia",
  image: p.image,
  description: p.description,
  terms: p.termsList,
  min: p.min,
  max: p.max,
}));
const allCampaigns = liveCampaigns.length ? liveCampaigns : campaigns;
// Quick-pick amounts inside a real campaign's range
const quickAmounts = (c: Campaign) =>
  c.min && c.max
    ? [...new Set([c.min, 100, 250, 500, c.max].filter((a) => a >= c.min! && a <= c.max!))].sort((a, b) => a - b)
    : amountOptions;
const shownCategories = categories.filter((c) => allCampaigns.some((x) => x.category === c.id));

const Donations = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState<CategoryId>(allCampaigns[0].category);
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [amount, setAmount] = useState(1000);
  const { addBooking } = useBookings();
  const [paying, setPaying] = useState(false);
  const [payment, setPayment] = useState<PaymentResult>({ mode: "points", pointsUsed: 0, cashPaid: 0 });
  const [reference, setReference] = useState("");

  const list = allCampaigns.filter((c) => c.category === activeCategory);

  const openCampaign = (c: Campaign) => {
    setSelected(c);
    setAmount(c.min && c.max ? Math.min(Math.max(100, c.min), c.max) : 1000);
    setPaying(false);
    setReference("");
  };

  const completeDonation = (result: PaymentResult) => {
    if (!selected) return;
    const ref = makeReference("DON");
    addBooking({
      item: selected.title,
      category: "Donations",
      points: result.pointsUsed,
      cashPaid: result.cashPaid,
      date: new Date().toLocaleDateString("en-GB"),
      status: "Completed",
      meta: `${selected.org} · ${ref}`,
    });
    setPayment(result);
    setReference(ref);
  };

  if (selected && reference) {
    return (
      <BookingConfirmation
        noun="Donation"
        heading="Donation successful"
        reference={reference}
        payment={payment}
        balanceAfter={user.availablePoints - payment.pointsUsed}
        rows={[
          { label: "Campaign", value: selected.title },
          { label: "Organisation", value: selected.org },
          { label: "Donation", value: priceText(amount, STOREFRONT_RATE) },
        ]}
      />
    );
  }

  if (selected && paying) {
    return (
      <div className="mx-auto min-h-screen max-w-md bg-background">
        <BookingHeader title="Payment" onBack={() => setPaying(false)} steps={["Campaign", "Payment"]} current={1} />
        <PaymentStep
          noun="donation"
          totalPoints={amount}
          totalCash={cashOf(amount, STOREFRONT_RATE)}
          onConfirm={completeDonation}
          rows={[
            { label: "Campaign", value: selected.title },
            { label: "Organisation", value: selected.org },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/loyalty")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Donations</h1>
      </div>

      {/* Categories */}
      {shownCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {shownCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`h-9 shrink-0 rounded-full px-4 text-[13px] font-medium transition-colors ${
                activeCategory === c.id ? "bg-primary text-primary-foreground" : "bg-[#F1EEEA] text-foreground/70 hover:bg-[#E9E5E0]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Campaigns */}
      <div className="px-5 pt-5">
        <h2 className="mb-4 text-[15px] font-bold text-foreground">Support a cause</h2>
        <div className="flex flex-col gap-6">
          {list.map((c) => (
            <DealCard
              key={c.id}
              image={c.image}
              title={c.title}
              topChips={[shownCategories.find((x) => x.id === c.category)?.label ?? "Donation"]}
              badge={c.location}
              rows={[
                { label: "By", value: c.org },
                { label: c.min && c.max ? "Donate" : "From", value: c.min && c.max ? `${c.min.toLocaleString()} – ${c.max.toLocaleString()} pts` : priceText(amountOptions[0], STOREFRONT_RATE) },
              ]}
              onClick={() => openCampaign(c)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-[calc(28rem-2rem)] rounded-2xl">
          {(
            <>
              <DialogHeader>
                <DialogTitle className="text-base leading-snug">{selected?.title}</DialogTitle>
              </DialogHeader>
              <p className="text-xs text-muted-foreground">
                {selected?.org} · {selected?.location}
              </p>
              <div className="flex flex-wrap gap-2">
                {(selected ? quickAmounts(selected) : amountOptions).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`min-w-[64px] flex-1 rounded-xl border px-3 py-2 text-xs font-semibold ${
 amount === a ?"border-primary bg-primary/10 text-primary":"border-transparent text-foreground"
 }`}
                  >
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Donation</span>
                  <span className="font-semibold text-foreground">{priceText(amount, STOREFRONT_RATE)}</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-muted-foreground">Remaining balance</span>
                  <span className="font-semibold text-foreground">
                    {Math.max(user.availablePoints - amount, 0).toLocaleString()} Points
                  </span>
                </div>
              </div>
              {selected?.terms && (
                <ul className="list-disc space-y-1 pl-4 text-[11px] leading-relaxed text-muted-foreground">
                  {selected.terms.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
              <Button className="w-full" onClick={() => setPaying(true)}>
                Continue to payment
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Donations;
