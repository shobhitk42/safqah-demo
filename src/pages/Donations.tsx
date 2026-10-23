import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
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

const Donations = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("animals");
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [amount, setAmount] = useState(1000);
  const [done, setDone] = useState(false);

  const list = campaigns.filter((c) => c.category === activeCategory);

  const openCampaign = (c: Campaign) => {
    setSelected(c);
    setAmount(1000);
    setDone(false);
  };

  const confirmDonation = () => {
    if (amount > user.availablePoints) {
      toast.error("Not enough Points");
      return;
    }
    setDone(true);
    toast.success("Thank you for your donation!");
  };

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate("/")} className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Donations</h1>
      </div>

      <div className="px-4">
        <div className="safqah-banner rounded-2xl p-5">
          <p className="text-lg font-bold leading-tight">Give back with your Points</p>
          <p className="mt-1 text-xs">
            Support verified causes across Saudi Arabia.
          </p>
          <p className="mt-3 text-xs font-semibold">
            Balance: {user.availablePoints.toLocaleString()} Points
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4 grid grid-cols-4 gap-2 px-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`rounded-xl border p-2 text-center transition ${
              activeCategory === c.id ? "border-primary bg-primary/10" : "border-border bg-card"
            }`}
          >
            <img
              src={c.image}
              alt={c.label}
              loading="lazy"
              className="mx-auto mb-1 h-10 w-full rounded-lg object-cover"
            />
            <span className="block text-[10px] font-semibold leading-tight text-foreground">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Campaigns */}
      <div className="mt-5 space-y-4 px-4">
        {list.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-36 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-bold leading-snug text-card-foreground">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.org}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {c.location}
                </p>
                <Button className="mt-3 w-full" onClick={() => openCampaign(c)}>
                  <Heart className="mr-2 h-4 w-4" /> Donate Points
                </Button>
              </div>
            </div>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-[calc(28rem-2rem)] rounded-2xl">
          {!done ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-base leading-snug">{selected?.title}</DialogTitle>
              </DialogHeader>
              <p className="text-xs text-muted-foreground">
                {selected?.org} · {selected?.location}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {amountOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`rounded-xl border py-2 text-xs font-semibold ${
                      amount === a ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"
                    }`}
                  >
                    {a.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="rounded-xl bg-muted/50 p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Donation</span>
                  <span className="font-semibold text-foreground">{amount.toLocaleString()} Points</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="text-muted-foreground">Remaining balance</span>
                  <span className="font-semibold text-foreground">
                    {Math.max(user.availablePoints - amount, 0).toLocaleString()} Points
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={confirmDonation}>
                Confirm Donation
              </Button>
            </>
          ) : (
            <div className="py-4 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-center text-base">Donation Successful</DialogTitle>
              </DialogHeader>
              <p className="mt-2 text-sm text-muted-foreground">
                {amount.toLocaleString()} Points donated to {selected?.org}.
              </p>
              <Button className="mt-4 w-full" onClick={() => setSelected(null)}>
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Donations;
