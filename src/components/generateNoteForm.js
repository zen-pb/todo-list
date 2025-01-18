import Button from "./Button";

export default function generateNoteForm() {
  const form = document.createElement("form");
  form.classList.add("note-form");

  const formText = document.createElement("div");
  formText.classList.add("form-text");

  const titleInput = document.createElement("textarea");
  titleInput.name = "title";
  titleInput.maxLength = "999";
  titleInput.placeholder = "Title";

  const contentInput = document.createElement("textarea");
  contentInput.name = "content";
  contentInput.autocomplete = "off";
  contentInput.placeholder = "Take a note...";

  formText.append(titleInput, contentInput);

  const actionsBTN = document.createElement("div");
  actionsBTN.classList.add("actions-btn");

  const closeBTN = Button("Close");

  const submitBTN = Button("Save", "", "submit");

  actionsBTN.append(closeBTN, submitBTN);

  form.append(formText, actionsBTN);

  return form;
}
