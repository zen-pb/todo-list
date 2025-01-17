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

  const closeBTN = document.createElement("button");
  closeBTN.type = "button";
  closeBTN.id = "close";

  const img = document.createElement("img");
  img.src = closeSVG;

  closeBTN.append(img);

  titleDiv.append(title, closeBTN);

  const inputDiv = document.createElement("div");
  inputDiv.classList.add("project-form-inputDiv");

  const label = document.createElement("label");
  label.for = "project-name";
  label.textContent = "Name";

  const input = document.createElement("input");
  input.id = "project-name";
  input.name = "title";

  const line = document.createElement("hr");

  inputDiv.append(label, input, line);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("project-form-btnDiv");

  const cancelBTN = Button("Cancel");
  const addProjectBTN = Button("Add", "", "submit");

  btnDiv.append(cancelBTN, addProjectBTN);

  form.append(titleDiv, inputDiv, btnDiv);

  dialog.append(form);

  return dialog;
}
