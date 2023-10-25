"use client";

import { createContext, useState } from "react";
import { Ticket } from "@/utils/ticket.model";
import { Note } from "@/utils/note.model";

type TicketContextProviderProp = {
  children: React.ReactNode;
};

type TicketContextType = {
  tickets: Ticket[];
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  addTickets: (newTicket: Ticket) => void;
  getTicket: (ticketId: string) => Ticket | undefined;
};

export const TicketContext = createContext<TicketContextType | null>(
  {} as TicketContextType
);

export const TicketContextProvider = ({
  children,
}: TicketContextProviderProp) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  function addTickets(newTicket: Ticket): void {
    setTickets([newTicket, ...tickets]);
  }

  function getTicket(ticketId: string | number) {
    const ticket = tickets.find((ticket) => ticket.id === ticketId);
    return ticket;
  }

  const value = { tickets, setTickets, addTickets, getTicket, notes, setNotes };
  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};
