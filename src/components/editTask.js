import { format, getYear } from "date-fns";
import generateTaskForm from "./generateTaskForm";

export default function editTask(todoWrapper) {
  const editTaskForm = generateTaskForm();

  const todoTitle = todoWrapper.querySelector(".todo-title-text").textContent;
  const todoDesc =
    todoWrapper.querySelector(".todo-desc-text").textContent || "";
  const todoDueDate =
    todoWrapper.querySelector(".todo-due-date")?.textContent || "";
  const todoPriority = todoWrapper.querySelector(".check");
  const todoProject =
    todoWrapper.querySelector(".todo-project-text").textContent;
  const taskFormTitle = editTaskForm.querySelector('textarea[name="title"]');
  taskFormTitle.textContent = todoTitle;
  const taskFormDesc = editTaskForm.querySelector(
    'textarea[name="description"]'
  );
  taskFormDesc.textContent = todoDesc;
  const taskFormPriority = editTaskForm.querySelector("button#priority");
  taskFormPriority.textContent =
    todoPriority.classList[1].charAt(0).toUpperCase() +
    todoPriority.classList[1].slice(1);

  const taskFormDate = editTaskForm.querySelector('input[type="date"]');
  const taskFormDateBTN = editTaskForm.querySelector("button#due-date");

  if (todoDueDate !== "") {
    let formattedDate;
    if (!/\d{4}/.test(todoDueDate)) {
      formattedDate = `${todoDueDate} 2025`;
    } else {
      formattedDate = todoDueDate;
    }
    taskFormDate.valueAsDate = new Date(formattedDate);
    taskFormDateBTN.textContent = taskFormDate.value
      .toString()
      .includes(`${getYear(new Date())}`)
      ? format(taskFormDate.value, "dd MMM")
      : format(taskFormDate.value, "dd MMM yyyy");
  }

  const taskFormProject = editTaskForm.querySelector(`button#storage`);
  taskFormProject.textContent = todoProject;

  const saveBTN = editTaskForm.querySelector("button#add-task");
  saveBTN.id = "save";
  saveBTN.textContent = "Save";

  return editTaskForm;
}
