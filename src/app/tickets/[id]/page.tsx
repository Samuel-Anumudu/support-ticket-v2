"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { TicketContext } from "@/context/ticket.context";
import { FaPlus } from "react-icons/fa";
import { Note } from "@/utils/note.model";

import Modal from "react-modal";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import Spinner from "@/components/Spinner";
import TextArea from "@/components/formFields/TextArea";
import NoteItem from "@/components/NoteItem";

// Activate Modal into page
// Modal.setAppElement("#root");
function Ticket() {
  const { getTicket, setNotes, notes, tickets, addTickets, setTickets }: any =
    useContext(TicketContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const router = useRouter();
  const param = useParams();
  const ticketId = param.id;

  if (!ticketId) return <Spinner />;
  const ticket = getTicket(Number(ticketId));

  const computedDate = new Date(ticket?.createdAt).toLocaleString("en-US");

  // Open Modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Close ticket
  // const onTicketClose = () => {
  //   toast.success("Ticket Closed");
  //   addTickets({ ...ticket, status: "closed" });
  //   router.push("/tickets");
  // };

  const onTicketClose = () => {
    const ticketIndex = tickets.findIndex(
      (t: string | number | any) => t.id === ticket.id
    );

    if (ticketIndex === -1) {
      toast.error("Ticket not found");
    } else {
      const updatedTickets = [...tickets];
      updatedTickets[ticketIndex] = {
        ...updatedTickets[ticketIndex],
        status: "closed",
      };

      setTickets(updatedTickets);
      toast.success("Ticket Closed");
      router.push("/tickets");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };
  const onNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotes((prevNotes: Note[]) => [
      ...prevNotes,
      { text: noteText, id: new Date().valueOf(), createdAt: new Date() },
    ]);

    closeModal();
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket?.id}
          <span className={`status status-${ticket?.status}`}>
            {ticket?.status}
          </span>
        </h2>
        <h3>Date Submitted: {computedDate}</h3>
        <h3>Product: {ticket?.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket?.status !== "closed" && (
        <Button onClick={openModal} text="Add Note" className="btn">
          <FaPlus />
        </Button>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "600px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "relative",
          },
        }}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <Button className="btn-close" text="X" onClick={closeModal} />
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <TextArea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <Button type="submit" className="btn" text="Submit" />
          </div>
        </form>
      </Modal>

      {notes.map((note: Note) => (
        <NoteItem key={note.id} note={note} />
      ))}
      {ticket?.status !== "closed" && (
        <Button
          text="Close Ticket"
          onClick={onTicketClose}
          className="btn btn-block btn-danger"
        ></Button>
      )}
    </div>
  );
}

export default Ticket;
