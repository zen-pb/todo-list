import Button from "./Button";
import dueDateSvg from "../assets/images/due-date.svg";
import prioritySvg from "../assets/images/priority.svg";
import inboxSvg from "../assets/images/inbox-dropdown.svg";
import dropdownSvg from "../assets/images/dropdown.svg";

export default function generateTaskForm() {
  const form = document.createElement("form");

  const formText = document.createElement("div");
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Task name";
  titleInput.required = true;

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.placeholder = "Description";

  formText.append(titleInput, descriptionInput);

  const formOptions = document.createElement("div");

  const dueDateBTN = Button("Due date", dueDateSvg);
  const priorityBTN = Button("Priority", prioritySvg);

  formOptions.append(dueDateBTN, priorityBTN);

  const formActions = document.createElement("div");

  const storageBTN = Button("Inbox", inboxSvg);
  const dropdown = document.createElement("img");
  dropdown.src = dropdownSvg;

  storageBTN.appendChild(dropdown);

  const actionsBTN = document.createElement("div");
  const cancelBTN = Button("Cancel");
  const addTaskBTN = Button("Add task");

  actionsBTN.append(cancelBTN, addTaskBTN);

  formActions.append(storageBTN, actionsBTN);

  form.append(formText, formOptions, formActions);

  return form;
}
