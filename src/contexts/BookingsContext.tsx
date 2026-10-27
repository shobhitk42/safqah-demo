import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Booking {
  id: string;
  item: string;
  category: string;
  points: number;
  /** Cash paid by card, when the order was paid with cash or cash + points. */
  cashPaid?: number;
  date: string;
  status: string;
  meta?: string;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id">) => void;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (b: Omit<Booking, "id">) => {
    const id = `ORD-${Date.now().toString().slice(-8)}`;
    setBookings((prev) => [{ id, ...b }, ...prev]);
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const ctx = useContext(BookingsContext);
  if (!ctx) throw new Error("useBookings must be used within BookingsProvider");
  return ctx;
};