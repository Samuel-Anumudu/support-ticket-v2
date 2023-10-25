"use client";

import { TicketContextProvider } from "@/context/ticket.context";

export function Provider({ children }: { children: React.ReactNode }) {
  return <TicketContextProvider>{children}</TicketContextProvider>;
}

// https://medium.com/@seb_5882/nextjs-13-4-using-context-api-in-app-router-a1198a61c5c8
