import generateNoteForm from "./generateNoteForm";

export default function editNote(noteCard) {
  const editNoteForm = generateNoteForm();

  const noteID = noteCard.classList[1];
  const noteTitle = noteCard.querySelector("h1").textContent;
  const noteContent = noteCard.querySelector("p").textContent;

  editNoteForm.classList.add(noteID);
  const noteFormTitle = editNoteForm.querySelector('textarea[name="title"]');
  noteFormTitle.textContent = noteTitle;
  const noteFormContent = editNoteForm.querySelector(
    'textarea[name="content"]'
  );
  noteFormContent.textContent = noteContent;

  return editNoteForm;
}
