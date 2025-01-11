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
  const priorityBTN = taskForm.querySelector("button#priority");
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

  priorityBTN.addEventListener("click", () => {
    const dropdownContent = taskForm.querySelector(".priority-dropdown ul");
    dropdownContent.classList.toggle("show");
  });

  window.onclick = function (event) {
    if (!event.target.matches("button#priority")) {
      var dropdowns = document.getElementsByClassName("dropdown-items");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
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
