import Button from "./Button";

export default function generateNoteForm() {
  const form = document.createElement("form");
  form.classList.add("note-form");

  const formText = document.createElement("div");
  formText.classList.add("form-text");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.placeholder = "Title";

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.name = "description";
  descriptionInput.placeholder = "Take a note...";

  formText.append(titleInput, descriptionInput);

  const actionsBTN = document.createElement("div");
  actionsBTN.classList.add("actions-btn");

  const closeBTN = Button("Close");

  const submitBTN = Button("Save", "", "submit");

  actionsBTN.append(closeBTN, submitBTN);

  form.append(formText, actionsBTN);

  return form;
}
