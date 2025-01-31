import { format, getYear } from "date-fns";
import generateTaskForm from "./generateTaskForm";
import highPriority from "../assets/images/high-priority.svg";
import mediumPriority from "../assets/images/medium-priority.svg";
import lowPriority from "../assets/images/low-priority.svg";
import noPriority from "../assets/images/priority-none.svg";

export default function editTask(todoWrapper) {
  const editTaskForm = generateTaskForm();

  const todoID = todoWrapper.classList[1];
  const todoTitle = todoWrapper.querySelector(".todo-title-text").textContent;
  const todoDesc =
    todoWrapper.querySelector(".todo-desc-text").textContent || "";
  const todoDueDate = todoWrapper.querySelector(".todo-due-date");
  const todoPriority = todoWrapper.querySelector("button#checkBTN");
  const todoProject =
    todoWrapper.querySelector(".todo-project-text").textContent;

  editTaskForm.classList.add(todoID);
  const taskFormTitle = editTaskForm.querySelector('textarea[name="title"]');
  taskFormTitle.textContent = todoTitle;
  const taskFormDesc = editTaskForm.querySelector(
    'textarea[name="description"]'
  );
  taskFormDesc.textContent = todoDesc;
  const taskFormPriority = editTaskForm.querySelector("button#priority");
  const formPriorityText =
    todoPriority.classList[0].charAt(0).toUpperCase() +
    todoPriority.classList[0].slice(1);

  const prioritySpan = taskFormPriority.querySelector("span");
  prioritySpan.innerHTML = "";
  const priorityImg = document.createElement("img");

  switch (formPriorityText) {
    case "None":
      priorityImg.src = noPriority;
      break;
    case "Low":
      priorityImg.src = lowPriority;
      break;
    case "Medium":
      priorityImg.src = mediumPriority;
      break;
    case "High":
      priorityImg.src = highPriority;
      break;
  }

  prioritySpan.append(priorityImg);
  taskFormPriority.childNodes[1].textContent = formPriorityText;

  const taskFormDate = editTaskForm.querySelector('input[type="date"]');
  const taskFormDateBTN = editTaskForm.querySelector("button#due-date");

  if (todoDueDate.textContent !== "") {
    let formattedDate;
    if (!/\d{4}/.test(todoDueDate.textContent)) {
      formattedDate = `${todoDueDate.textContent} 2025`;
    } else {
      formattedDate = todoDueDate.textContent;
    }
    taskFormDate.value = format(new Date(formattedDate), "yyyy-MM-dd");

    const taskFormDateText = taskFormDate.value
      .toString()
      .includes(`${getYear(new Date())}`)
      ? format(taskFormDate.value, "dd MMM")
      : format(taskFormDate.value, "dd MMM yyyy");

    taskFormDateBTN.childNodes[1].textContent = taskFormDateText;
  }

  const taskFormProject = editTaskForm.querySelector(`button#storage`);
  taskFormProject.childNodes[1].textContent = todoProject;

  const saveBTN = editTaskForm.querySelector("button#add-task");
  saveBTN.id = "save";
  saveBTN.textContent = "Save";

  return editTaskForm;
}
