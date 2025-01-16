import Button from "./Button";

export default function generateNoteForm() {
  const form = document.createElement("form");
  form.classList.add("note-form");

  const formText = document.createElement("div");
  formText.classList.add("form-text");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Title";

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.placeholder = "Take a note...";

  formText.append(titleInput, descriptionInput);

  const actionsBTN = document.createElement("div");
  actionsBTN.classList.add("actions-btn");

  const closeBTN = Button("Close", "", "submit");

  actionsBTN.append(closeBTN);

  form.append(formText, actionsBTN);

  return form;
}
