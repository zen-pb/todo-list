import Button from "./Button";
import addSvg from "../assets/images/add.svg";
import generateTaskForm from "./generateTaskForm";
import { format, getYear } from "date-fns";
import generateNewProjectModal from "./generateNewProjectModal";
import generateNoteForm from "./generateNoteForm";
import Notes from "../classes/Notes";
import Storage from "../classes/Storage";

export default function loadContent(name = "Inbox") {
  const content = document.getElementById("content");

  content.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("container");

  const containerTitle = document.createElement("h1");
  containerTitle.classList.add("container-title");
  containerTitle.textContent = name;

  const containerContent = document.createElement("div");
  containerContent.classList.add("container-content");

  const addTasksRoutes = ["Inbox", "Today", "This Week"];

  if (addTasksRoutes.includes(containerTitle.textContent)) {
    addTaskRouteHandler(containerContent);
  }

  if (containerTitle.textContent === "Projects") {
    addProjectRouteHandler(containerContent);
  }

  if (containerTitle.textContent === "Notes") {
    addNoteRouteHandler(containerContent);
  }
  container.append(containerTitle, containerContent);
  content.append(container);
}

function addTaskRouteHandler(containerContent) {
  const addTaskBTN = Button("Add task", addSvg);

  const taskForm = generateTaskForm();
  const dueDateBTN = taskForm.querySelector("button#due-date");
  const dateInput = taskForm.querySelector("input[type='date']");
  const priorityBTN = taskForm.querySelector("button#priority");
  const priorityChoices = taskForm.querySelectorAll(".dropdown-items button");

  const cancelBTN = taskForm.querySelector("button#cancel");

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(taskForm);
  });

  addTaskBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    containerContent.append(taskForm);
  });

  cancelBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    taskForm.reset();
    containerContent.append(addTaskBTN);
  });

  dueDateBTN.addEventListener("click", () => {
    dateInput.showPicker();
  });

  dateInput.addEventListener("change", () => {
    formattedDateHandler(dateInput, dueDateBTN);
  });

  priorityBTN.addEventListener("click", () => {
    dropdownContentHandler(priorityBTN.id, taskForm);
  });

  priorityChoices.forEach((button) => {
    button.addEventListener("click", () => {
      priorityBTN.innerHTML = button.innerHTML;
    });
  });

  window.onclick = (event) => {
    if (
      !event.target.closest(".dropdown-button") &&
      !event.target.closest("input[type='date']")
    ) {
      const dropdowns = document.getElementsByClassName("dropdown-items");
      for (let openDropdown of dropdowns) {
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  containerContent.append(addTaskBTN);
}

function addProjectRouteHandler(containerContent) {
  const addProjectBTN = Button("Add project", addSvg);

  const projectDialog = generateNewProjectModal();
  const closeBTN = projectDialog.querySelector("button#close");

  const projectForm = projectDialog.querySelector("form");

  const cancelBTN = projectDialog.querySelector("button#cancel");

  addProjectBTN.addEventListener("click", () => {
    projectDialog.showModal();
  });

  projectDialog.addEventListener("click", (e) => {
    const dialogDimensions = projectDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      projectDialog.close();
    }
  });

  closeBTN.addEventListener("click", () => {
    projectDialog.close();
  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(projectForm);
  });

  cancelBTN.addEventListener("click", () => {
    projectDialog.close();
  });

  containerContent.append(addProjectBTN, projectDialog);
}

function addNoteRouteHandler(containerContent) {
  const addNoteBTN = Button("Add note", addSvg);

  const noteForm = generateNoteForm();

  const closeBTN = noteForm.querySelector("button#close");

  addNoteBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    containerContent.append(noteForm);
  });

  closeBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    noteForm.reset();
    containerContent.append(addNoteBTN);
  });

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formInputs = noteForm.querySelectorAll("input");
    let isEmpty = true;

    formInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        isEmpty = false;
      }
    });

    if (isEmpty) return;

    const formData = new FormData(noteForm);
    const dataObject = Object.fromEntries(formData);

    const note = new Notes(dataObject.title, dataObject.content);

    Storage.setStorage("notes", note);

    noteForm.reset();
    containerContent.innerHTML = "";
    containerContent.append(addNoteBTN);
  });

  containerContent.append(addNoteBTN);
}

function dropdownContentHandler(buttonId, taskForm) {
  const dropdownContent = taskForm.querySelector(`.${buttonId}-dropdown ul`);

  const openDropdowns = taskForm.querySelectorAll(".dropdown-items.show");
  openDropdowns.forEach((dropdown) => {
    if (dropdown !== dropdownContent) dropdown.classList.remove("show");
  });

  dropdownContent.classList.toggle("show");
}

function formattedDateHandler(dateInput, dueDateBTN) {
  const dateValue = dateInput.value;
  let formattedDate;

  if (!dateValue) {
    dueDateBTN.childNodes[1].textContent = "Due date";
    return;
  }

  const selectedDate = new Date(dateValue);
  const currentYear = getYear(new Date());
  const selectedYear = getYear(selectedDate);

  if (selectedYear === currentYear) {
    formattedDate = format(selectedDate, "dd MMM");
  } else {
    formattedDate = format(selectedDate, "dd MMM yyyy");
  }

  dueDateBTN.childNodes[1].textContent = formattedDate;

  const dropdown = dateInput.closest(".dropdown-items");
  if (dropdown && dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  }
}
