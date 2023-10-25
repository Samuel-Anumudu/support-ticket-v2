"use client";

import { useContext } from "react";
import { TicketContext } from "@/context/ticket.context";
import BackButton from "@/components/ui/BackButton";
import TicketItem from "@/components/TicketItem";
import { Ticket } from "@/utils/ticket.model";
import Link from "next/link";

export default function Tickets() {
  const { tickets }: any = useContext(TicketContext);

  return (
    <>
      <BackButton url="/" />
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.length ? (
          tickets.map((ticket: Ticket) => (
            <TicketItem key={ticket.id as number} ticket={ticket} />
          ))
        ) : (
          <h3>
            You have no tickets to view.{" "}
            <Link style={{ textDecoration: "underline" }} href="/new-ticket">
              Please create a ticket
            </Link>
          </h3>
        )}
      </div>
    </>
  );
}
