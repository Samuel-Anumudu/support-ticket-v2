import { Note } from "@/utils/note.model";

function NoteItem({ note }: { note: Note }) {
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        {/* {note.isStaff ? <span>Staff</span> : <span>{user?.name}</span>} */}
        <span>Note from User: {note.id}</span>
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt!).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default NoteItem;
