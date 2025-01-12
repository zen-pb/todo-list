import Button from "./Button";
import dueDateSvg from "../assets/images/due-date.svg";
import prioritySvg from "../assets/images/priority.svg";
import inboxSvg from "../assets/images/inbox-dropdown.svg";
import dropdownSvg from "../assets/images/dropdown.svg";
import Dropdown from "./Dropdown";
import highPriority from "../assets/images/high-priority.svg";
import mediumPriority from "../assets/images/medium-priority.svg";
import lowPriority from "../assets/images/low-priority.svg";
import noPriority from "../assets/images/priority-none.svg";

export default function generateTaskForm() {
  const form = document.createElement("form");
  form.classList.add("task-form");

  const formText = document.createElement("div");
  formText.classList.add("form-text");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Task name";
  titleInput.required = true;

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.placeholder = "Description";

  formText.append(titleInput, descriptionInput);

  const formOptions = document.createElement("div");
  formOptions.classList.add("form-options");

  const dueDateBTN = Button("Due date", dueDateSvg);

  const calendar = document.createElement("input");
  calendar.type = "date";

  const dateDiv = document.createElement("div");
  dateDiv.classList.add("due-date-dropdown");
  dateDiv.append(dueDateBTN, calendar);

  const priorityBTN = Button("Priority", prioritySvg);

  const priorityList = [
    Button("High", highPriority),
    Button("Medium", mediumPriority),
    Button("Low", lowPriority),
    Button("None", noPriority),
  ];
  const priorityDiv = Dropdown(priorityBTN, priorityList);

  formOptions.append(dateDiv, priorityDiv);

  const formActions = document.createElement("div");
  formActions.classList.add("form-actions");

  const storageBTN = Button("Inbox", inboxSvg);
  const dropdown = document.createElement("img");
  dropdown.src = dropdownSvg;

  storageBTN.appendChild(dropdown);

  const actionsBTN = document.createElement("div");
  actionsBTN.classList.add("actions-btn");

  const cancelBTN = Button("Cancel");
  const addTaskBTN = Button("Add task", "", "submit");

  actionsBTN.append(cancelBTN, addTaskBTN);

  formActions.append(storageBTN, actionsBTN);

  form.append(formText, formOptions, formActions);

  return form;
}
