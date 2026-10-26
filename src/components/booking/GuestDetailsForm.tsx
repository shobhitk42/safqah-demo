import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type PersonDetails = { title: string; firstName: string; lastName: string };
export type ContactDetails = { email: string; phone: string };

export const emptyPeople = (n: number): PersonDetails[] =>
  Array.from({ length: n }, () => ({ title: "Mr", firstName: "", lastName: "" }));

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const SAVED_PROFILES = [
  { id: "self", label: "Mohammed (You)", title: "Mr", firstName: "Mohammed", lastName: "Al Rashid", email: "mohammed.alrashid@email.com", phone: "501234567" },
  { id: "spouse", label: "Noura", title: "Mrs", firstName: "Noura", lastName: "Al Rashid", email: "noura.alrashid@email.com", phone: "507654321" },
  { id: "brother", label: "Faisal", title: "Mr", firstName: "Faisal", lastName: "Al Qahtani", email: "faisal.qahtani@email.com", phone: "552345678" },
  { id: "colleague", label: "Reem", title: "Ms", firstName: "Reem", lastName: "Al Otaibi", email: "reem.otaibi@email.com", phone: "559876543" },
];

interface GuestDetailsFormProps {
  /** "Guest" for hotels, "Traveller" for flights. */
  noun: string;
  people: PersonDetails[];
  onPeopleChange: (p: PersonDetails[]) => void;
  contact: ContactDetails;
  onContactChange: (c: ContactDetails) => void;
  requests?: string;
  onRequestsChange?: (v: string) => void;
  showErrors: boolean;
}

const TITLES = ["Mr", "Mrs", "Ms"];

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
    {children}
    {error && <p className="mt-1 text-[11px] text-destructive">{error}</p>}
  </div>
);

const GuestDetailsForm = ({
  noun,
  people,
  onPeopleChange,
  contact,
  onContactChange,
  requests,
  onRequestsChange,
  showErrors,
}: GuestDetailsFormProps) => {
  const update = (i: number, patch: Partial<PersonDetails>) =>
    onPeopleChange(people.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  return (
    <div className="space-y-8 px-5 pb-40 pt-5">
      {people.map((p, i) => (
        <section key={i} className="space-y-4">
          <h2 className="text-[15px] font-bold text-foreground">
            {noun} {i + 1}
            {i === 0 && <span className="ml-2 text-[12px] font-normal text-muted-foreground">Lead {noun.toLowerCase()}</span>}
          </h2>
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Saved profiles</p>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-hide">
              {SAVED_PROFILES.map((sp) => {
                const active = p.firstName === sp.firstName && p.lastName === sp.lastName;
                return (
                  <button
                    key={sp.id}
                    onClick={() => {
                      update(i, { title: sp.title, firstName: sp.firstName, lastName: sp.lastName });
                      if (i === 0) onContactChange({ email: sp.email, phone: sp.phone });
                    }}
                    className={`h-9 shrink-0 rounded-full border px-4 text-[13px] font-medium transition-colors ${
                      active ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-[#F1EEEA] text-foreground/70 hover:bg-[#E9E5E0]"
                    }`}
                  >
                    {sp.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2">
            {TITLES.map((t) => (
              <button
                key={t}
                onClick={() => update(i, { title: t })}
                className={`h-10 rounded-[10px] border px-5 text-[14px] font-medium transition-colors ${
                  p.title === t ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-[#F1EEEA] text-foreground/70 hover:bg-[#E9E5E0]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Field label="First name" error={showErrors && !p.firstName.trim() ? "Enter the first name as on the ID" : undefined}>
            <Input value={p.firstName} onChange={(e) => update(i, { firstName: e.target.value })} placeholder="As on ID" />
          </Field>
          <Field label="Last name" error={showErrors && !p.lastName.trim() ? "Enter the last name as on the ID" : undefined}>
            <Input value={p.lastName} onChange={(e) => update(i, { lastName: e.target.value })} placeholder="As on ID" />
          </Field>
        </section>
      ))}

      <section className="space-y-4 border-t border-border pt-6">
        <h2 className="text-[15px] font-bold text-foreground">Contact details</h2>
        <p className="-mt-2 text-[12px] text-muted-foreground">Your confirmation will be sent here.</p>
        <Field label="Email" error={showErrors && !isValidEmail(contact.email) ? "Enter a valid email address" : undefined}>
          <Input type="email" value={contact.email} onChange={(e) => onContactChange({ ...contact, email: e.target.value })} placeholder="name@email.com" />
        </Field>
        <Field label="Mobile number" error={showErrors && contact.phone.replace(/\D/g, "").length < 9 ? "Enter a 9-digit mobile number" : undefined}>
          <div className="flex items-end gap-3">
            <span className="mb-0.5 flex h-10 items-center rounded-[10px] bg-[#F1EEEA] px-3 text-sm text-muted-foreground">+966</span>
            <Input
              type="tel"
              inputMode="numeric"
              value={contact.phone}
              onChange={(e) => onContactChange({ ...contact, phone: e.target.value.replace(/\D/g, "").slice(0, 9) })}
              placeholder="5X XXX XXXX"
            />
          </div>
        </Field>
      </section>

      {onRequestsChange && (
        <section className="space-y-3 border-t border-border pt-6">
          <h2 className="text-[15px] font-bold text-foreground">Special requests</h2>
          <p className="-mt-1 text-[12px] text-muted-foreground">Optional. Requests are subject to availability.</p>
          <Textarea
            value={requests ?? ""}
            onChange={(e) => onRequestsChange(e.target.value)}
            placeholder="e.g. Early check-in, high floor, quiet room"
            className="min-h-[88px] rounded-[10px] border-[#CFCBD0] bg-transparent"
          />
        </section>
      )}
    </div>
  );
};

export const useGuestForm = (count: number) => {
  const [people, setPeople] = useState<PersonDetails[]>(emptyPeople(count));
  const [contact, setContact] = useState<ContactDetails>({ email: "", phone: "" });
  const [requests, setRequests] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const valid =
    people.every((p) => p.firstName.trim() && p.lastName.trim()) && isValidEmail(contact.email) && contact.phone.replace(/\D/g, "").length >= 9;
  return { people, setPeople, contact, setContact, requests, setRequests, showErrors, setShowErrors, valid };
};

export default GuestDetailsForm;
