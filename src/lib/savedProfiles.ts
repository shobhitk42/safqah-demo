export interface SavedProfile {
  id: string;
  label: string;
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationality: string;
  passport: string;
  passportExpiry: string;
  email: string;
  phone: string;
}

const KEY = "ei_saved_profiles_v1";

const SEED: SavedProfile[] = [
  {
    id: "self", label: "Myself", title: "Mr", firstName: "Ahmed", lastName: "Al Mansoori",
    dob: "1989-04-12", nationality: "United Arab Emirates", passport: "A1234567",
    passportExpiry: "2031-06-30", email: "ahmed.almansoori@email.com", phone: "+971 50 123 4567",
  },
  {
    id: "spouse", label: "Spouse", title: "Mrs", firstName: "Layla", lastName: "Al Mansoori",
    dob: "1991-09-02", nationality: "United Arab Emirates", passport: "A7654321",
    passportExpiry: "2030-11-15", email: "layla.m@email.com", phone: "+971 55 987 6543",
  },
  {
    id: "brother", label: "Brother", title: "Mr", firstName: "Omar", lastName: "Al Mansoori",
    dob: "1995-01-24", nationality: "United Arab Emirates", passport: "B2233445",
    passportExpiry: "2029-03-08", email: "omar.m@email.com", phone: "+971 52 445 8890",
  },
];

export const getSavedProfiles = (): SavedProfile[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : SEED;
  } catch {
    return SEED;
  }
};

export const saveProfile = (profile: Omit<SavedProfile, "id">) => {
  try {
    const list = getSavedProfiles();
    const next = [...list, { ...profile, id: `p_${Date.now()}` }];
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    return getSavedProfiles();
  }
};
