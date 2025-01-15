import Button from "./Button";
import closeSVG from "../assets/images/close.svg";

export default function generateNewProjectModal() {
  const dialog = document.createElement("dialog");
  dialog.classList.add("project-dialog");

  const form = document.createElement("form");
  form.classList.add("project-form");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("project-form-titleDiv");

  const title = document.createElement("h1");
  title.textContent = "Add project";

  const closeBTN = Button(null, closeSVG);

  titleDiv.appendChild(title, closeBTN);

  const line = document.createElement("hr");

  const inputDiv = document.createElement("div");
  inputDiv.classList.add("project-form-inputDiv");

  const label = document.createElement("label");
  label.for = "project-name";

  const input = document.createElement("input");
  input.id = "project-name";

  inputDiv.append(label, input);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("project-form-btnDiv");

  const cancelBTN = Button("Cancel");
  const addProjectBTN = Button("Add", "", "submit");

  btnDiv.append(cancelBTN, addProjectBTN);

  form.append(titleDiv, line, inputDiv, btnDiv);

  dialog.append(form);

  return dialog;
}
