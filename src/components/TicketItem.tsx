"use client";

import Link from "next/link";
import { Ticket } from "@/utils/ticket.model";

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  const { id, product, createdAt, status } = ticket;

  return (
    <div className="ticket">
      <div>{createdAt.toLocaleDateString("en-US")}</div>
      <div>{product}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link href={`/tickets/${id}`} className="btn  btn-reverse btn-sm">
        View
      </Link>
    </div>
  );
}
