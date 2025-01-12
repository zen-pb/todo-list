import Button from "./Button";
import addSvg from "../assets/images/add.svg";
import generateTaskForm from "./generateTaskForm";

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

  const addTaskBTN = Button("Add task", addSvg);

  const taskForm = generateTaskForm();
  const dueDateBTN = taskForm.querySelector("button#due-date");
  const priorityBTN = taskForm.querySelector("button#priority");
  const priorityChoices = taskForm.querySelectorAll(".dropdown-items button");

  const cancelBTN = taskForm.querySelector("button#cancel");

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
    dropdownContentHandler(dueDateBTN.id, taskForm);
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

  container.append(containerTitle, containerContent);
  content.append(container);
}

function dropdownContentHandler(buttonId, taskForm) {
  const dropdownContent = taskForm.querySelector(`.${buttonId}-dropdown ul`);
  dropdownContent.classList.toggle("show");
}
