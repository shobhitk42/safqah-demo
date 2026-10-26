import DealCard from "@/components/DealCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Calendar, ChevronRight, Trophy, Music, Theater, Bike, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const sportCategories = [
  { icon: "⚽", label: "Football", count: 2450 },
  { icon: "🏀", label: "Basketball", count: 890 },
  { icon: "🏎️", label: "Formula 1", count: 340 },
  { icon: "🎾", label: "Tennis", count: 560 },
  { icon: "🏏", label: "Cricket", count: 420 },
  { icon: "🎵", label: "Concerts", count: 1200 },
  { icon: "🎭", label: "Theater", count: 380 },
  { icon: "🥊", label: "Boxing/MMA", count: 210 },
];

const featuredEvents = [
  {
    id: 1,
    sport: "Football",
    title: "Atletico Madrid vs Real Sociedad",
    league: "Spanish Cup - Copa del Rey · Final",
    venue: "Estadio Olimpico de La Cartuja",
    city: "Seville, Spain",
    date: "Sat, 18 Apr 2026",
    points: 12500,
    image: "https://images-cdn.sportsevents365.com/team/1384/secondary-image/1384.png",
  },
  {
    id: 2,
    sport: "Football",
    title: "Bayern Munich vs VfB Stuttgart",
    league: "German Bundesliga",
    venue: "Allianz Arena",
    city: "Munich, Germany",
    date: "Sun, 19 Apr 2026",
    points: 9800,
    image: "https://images-cdn.sportsevents365.com/team/1182/secondary-image/1182.png",
  },
  {
    id: 3,
    sport: "Football",
    title: "AC Milan vs Juventus FC",
    league: "Italian Serie A",
    venue: "Stadio San Siro (Giuseppe Meazza)",
    city: "Milan, Italy",
    date: "Sun, 26 Apr 2026",
    points: 11200,
    image: "https://images-cdn.sportsevents365.com/team/1765/secondary-image/1765.png",
  },
  {
    id: 4,
    sport: "Football",
    title: "Manchester City vs Southampton",
    league: "FA Cup · Semi-Final",
    venue: "Wembley Stadium",
    city: "London, England",
    date: "Sun, 26 Apr 2026",
    points: 15000,
    image: "https://images-cdn.sportsevents365.com/team/1110/secondary-image/1110.png",
  },
  {
    id: 5,
    sport: "Football",
    title: "Galatasaray SK vs Fenerbahce SK",
    league: "Turkish Super Lig",
    venue: "Rams Park Stadium",
    city: "Istanbul, Turkey",
    date: "Sun, 26 Apr 2026",
    points: 7500,
    image: "https://images-cdn.sportsevents365.com/sport-type/1000/secondary-image/1000.png",
  },
  {
    id: 6,
    sport: "Football",
    title: "AFC Ajax vs PSV Eindhoven",
    league: "Dutch Eredivisie",
    venue: "Johan Cruyff Arena",
    city: "Amsterdam, Netherlands",
    date: "Sun, 3 May 2026",
    points: 8200,
    image: "https://images-cdn.sportsevents365.com/sport-type/1000/secondary-image/1000.png",
  },
];

const popularLeagues = [
  { name: "English Premier League", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "Spanish La Liga", emoji: "🇪🇸" },
  { name: "UEFA Champions League", emoji: "🏆" },
  { name: "Formula 1", emoji: "🏎️" },
  { name: "Six Nations Rugby", emoji: "🏉" },
  { name: "NBA", emoji: "🏀" },
];

const SportsEvents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = featuredEvents.filter((e) => {
    const matchSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.league.toLowerCase().includes(search.toLowerCase()) ||
      e.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || e.sport === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button
          onClick={() => navigate("/loyalty")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Sports / Events</h1>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search team, event, city or artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl bg-muted border-0"
          />
        </div>
      </div>

      {/* Sport Categories */}
      <div className="px-4 pb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Browse by category</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {sportCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.label ? null : cat.label)
              }
              className={`flex min-w-[80px] flex-col items-center gap-1 rounded-xl p-3 transition-colors border ${
 selectedCategory === cat.label
 ?"border-primary bg-primary/10"
 :"border-transparent bg-[#F1EEEA]"
 }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[10px] font-medium text-card-foreground whitespace-nowrap">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Leagues */}
      <div className="px-4 pb-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">Popular leagues</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {popularLeagues.map((league) => (
            <button
              key={league.name}
              onClick={() => setSearch(league.name)}
              className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground whitespace-nowrap hover:bg-accent transition-colors"
            >
              <span>{league.emoji}</span>
              {league.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Events */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">
            {search || selectedCategory ? "Results" : "Top events"}
          </h3>
          <span className="text-xs text-muted-foreground">{filtered.length} events</span>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-2xl bg-[#ECE8E3] p-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No events found. Try a different search.</p>
            </div>
          )}

          {filtered.map((event) => (
            <DealCard
              key={event.id}
              image={event.image}
              title={event.title}
              topChips={[event.sport, event.league]}
              badge={event.city}
              rows={[
                { label: "From", value: `${event.points.toLocaleString()} pts` },
                { label: "Date", value: event.date },
              ]}
            />
          ))}
        </div>
      </div>

      {/* Powered by badge */}
      <div className="px-4 pt-6 pb-4 text-center">
        <p className="text-[10px] text-muted-foreground">
          Powered by SportsEvents365
        </p>
      </div>
    </div>
  );
};

export default SportsEvents;
