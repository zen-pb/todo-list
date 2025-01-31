import Button from "./Button";
import addSvg from "../assets/images/add.svg";
import generateTaskForm from "./generateTaskForm";
import { format, getYear } from "date-fns";
import generateNewProjectModal from "./generateNewProjectModal";
import generateNoteForm from "./generateNoteForm";
import Notes from "../classes/Notes";
import Storage from "../classes/Storage";
import Project from "../classes/Projects";
import prioritySvg from "../assets/images/priority.svg";
import dueDateSvg from "../assets/images/due-date.svg";
import dropdownSvg from "../assets/images/dropdown.svg";
import storageList from "./storageList";
import Dropdown from "./Dropdown";
import loadNotes from "./loadNotes";
import loadProjects from "./loadProjects";
import loadTodos from "./loadTodos";
import editTask from "./editTask";
import editProject from "./editProject";
import editNote from "./editNote";
import todoProjectModal from "./todoProjectModal";

export default function loadContent(name = "Inbox") {
  const content = document.getElementById("content");

  content.innerHTML = "";

  loadData();

  const container = document.createElement("div");
  container.classList.add("container");

  const containerTitle = document.createElement("h1");
  containerTitle.classList.add("container-title");
  containerTitle.textContent = name;

  const containerContent = document.createElement("div");
  containerContent.classList.add("container-content");

  if (containerTitle.textContent === "Inbox") {
    addTaskRouteHandler(containerContent);
  }

  if (containerTitle.textContent === "Projects") {
    addProjectRouteHandler(containerContent);
  }

  if (containerTitle.textContent === "Notes") {
    addNoteRouteHandler(containerContent);
  }

  const dialog = generateModal(containerContent);

  content.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest(".dropdown-button")) {
        const dropdowns = document.querySelectorAll(".dropdown-items");
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("show");
        });
      }
    },
    false
  );

  container.append(containerTitle, containerContent);
  content.append(container, dialog);

  if (containerTitle.textContent === "Inbox") {
    dropdownEventListeners(containerContent);
  }

  if (containerTitle.textContent === "Projects") {
    dropdownEventListeners(containerContent);
    showTodosInProject();
  }

  if (containerTitle.textContent === "Notes") {
    dropdownEventListeners(containerContent);
    const noteContainer = loadNotes();
    content.appendChild(noteContainer);
  }

  todoCheckHandler();
  editHandler(containerContent);
  deleteHandler(containerContent);
}

function addTaskRouteHandler(containerContent, projectName = "Inbox") {
  const addTaskBTN = Button("Add task", addSvg);

  const taskForm = generateTaskForm();
  const dueDateBTN = taskForm.querySelector("button#due-date");
  const priorityBTN = taskForm.querySelector("button#priority");
  const storageBTN = taskForm.querySelector("button#storage");
  storageBTN.textContent = projectName;

  const cancelBTN = taskForm.querySelector("button#cancel");

  addTaskEventListeners(taskForm);

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formInputChecker(taskForm)) return;

    const formData = new FormData(taskForm);
    const dataObject = Object.fromEntries(formData);
    dataObject.priority = priorityBTN.textContent.toLowerCase();
    dataObject.projectName = storageBTN.textContent;
    dataObject.id = crypto.randomUUID();
    dataObject.checked = false;

    Storage.setStorage("projects", dataObject, "store");

    resetTaskForm(
      taskForm,
      dueDateBTN,
      priorityBTN,
      storageBTN,
      containerContent,
      addTaskBTN,
      projectName
    );
  });

  addTaskBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    const todoContainer = loadTodos(projectName);
    containerContent.append(todoContainer, taskForm);
  });

  cancelBTN.addEventListener("click", () => {
    resetTaskForm(
      taskForm,
      dueDateBTN,
      priorityBTN,
      storageBTN,
      containerContent,
      addTaskBTN,
      projectName
    );
  });

  const todoContainer = loadTodos(projectName);

  containerContent.append(todoContainer, addTaskBTN);
  todoCheckHandler();
  editHandler(containerContent);
  deleteHandler(containerContent);
}

function addProjectRouteHandler(containerContent) {
  dropdownEventListeners(containerContent);
  const addProjectBTN = Button("Add project", addSvg);

  addProjectBTN.addEventListener("click", () => {
    const dialog = document.querySelector(".project-dialog");
    dialog.showModal();
  });

  const projectContainer = loadProjects();

  containerContent.append(addProjectBTN, projectContainer);
}

function addNoteRouteHandler(containerContent) {
  const addNoteBTN = Button("Add note", addSvg);

  const noteForm = generateNoteForm();

  const closeBTN = noteForm.querySelector("button#close");

  addNoteBTN.addEventListener("click", () => {
    containerContent.innerHTML = "";
    containerContent.append(noteForm);

    const textareas = document.querySelectorAll("textarea");

    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";

        if (textarea.value === "") {
          textarea.style.height = "45px";
        }
      });
    });
  });

  closeBTN.addEventListener("click", () => {
    textareaReset();
    containerContent.innerHTML = "";
    noteForm.reset();
    containerContent.append(addNoteBTN);
  });

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formInputChecker(noteForm)) return;

    const formData = new FormData(noteForm);
    const dataObject = Object.fromEntries(formData);

    const note = new Notes(dataObject.title, dataObject.content);

    Storage.setStorage("notes", note, "store");

    noteForm.reset();
    textareaReset();
    containerContent.innerHTML = "";
    containerContent.append(addNoteBTN);

    const existingNoteContainer = document.querySelector(".notes-container");
    if (existingNoteContainer) {
      existingNoteContainer.remove();
    }

    const noteContainer = loadNotes();
    document.getElementById("content").appendChild(noteContainer);
    editHandler(noteContainer);
    deleteHandler(containerContent);
  });

  containerContent.append(addNoteBTN);
}

function dropdownContentHandler(buttonId, taskForm) {
  const dropdownContent = taskForm.querySelector(`.${buttonId}-dropdown ul`);

  const openDropdowns = document.querySelectorAll(".dropdown-items.show");
  openDropdowns.forEach((dropdown) => {
    if (dropdown !== dropdownContent) {
      dropdown.classList.remove("show");
    }
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

function formInputChecker(form) {
  const formInputs = form.querySelectorAll("input[required]");
  return Array.from(formInputs).some((input) => input.value.trim() === "");
}
function isProjectExisting(projectName) {
  const projects = Storage.getStorage("projects");
  return projects.some((project) => project[projectName]);
}

function loadData() {
  if (localStorage.length === 0) {
    Storage.generateData();
  }
}

function addDropdownSvg(storageBTN) {
  const dropdown = document.createElement("img");
  dropdown.src = dropdownSvg;
  storageBTN.appendChild(dropdown);
}

function generateModal(containerContent) {
  const projectDialog = generateNewProjectModal();
  const closeBTN = projectDialog.querySelector("button#close");

  const projectForm = projectDialog.querySelector("form");

  const cancelBTN = projectDialog.querySelector("button#cancel");

  projectDialog.addEventListener("click", (e) => {
    if (e.target.closest("form")) return;

    const dialogDimensions = projectDialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      projectForm.reset();
      projectDialog.close();
    }
  });

  closeBTN.addEventListener("click", () => {
    projectForm.reset();
    projectDialog.close();
  });

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formInputChecker(projectForm)) return;

    const formData = new FormData(projectForm);
    const dataObject = Object.fromEntries(formData);

    if (isProjectExisting(dataObject.title)) return;

    const project = new Project(dataObject.title);

    Storage.setStorage("projects", project, "store");

    const containerTitle = document.querySelector(".container-title");

    if (containerTitle.textContent === "Projects") {
      const existingProjectContainer =
        document.querySelector(".project-container");
      if (existingProjectContainer) {
        existingProjectContainer.remove();
      }

      const projectContainer = loadProjects();
      containerContent.append(projectContainer);
      showTodosInProject();
    }

    refreshList();
    projectForm.reset();
    projectDialog.close();
    dropdownEventListeners(containerContent);
    editHandler(containerContent);
    deleteHandler(containerContent);
  });

  cancelBTN.addEventListener("click", () => {
    projectDialog.close();
  });

  return projectDialog;
}

function refreshList() {
  const storageDropdown = document.querySelector(".storage-dropdown");

  if (storageDropdown) {
    const currentStorageBTN = storageDropdown.querySelector("button#storage");
    const list = storageList();
    const form = storageDropdown.closest("form");

    const currentStorageText = currentStorageBTN.textContent;

    storageDropdown.innerHTML = Dropdown(currentStorageBTN, list).innerHTML;

    const newStorageBTN = storageDropdown.querySelector("button#storage");
    if (currentStorageText !== "Inbox") {
      newStorageBTN.innerHTML = currentStorageText;
      addDropdownSvg(newStorageBTN);
    }

    newStorageBTN.addEventListener("click", () => {
      dropdownContentHandler(newStorageBTN.id, form);
    });

    const storageChoices = storageDropdown.querySelectorAll("li button");
    storageChoices.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.id !== "add-project") {
          newStorageBTN.innerHTML = button.innerHTML;
          addDropdownSvg(newStorageBTN);
        } else {
          const dialog = document.querySelector(".project-dialog");
          dialog.showModal();
        }
      });
    });
  }
}

function resetTaskForm(
  taskForm,
  dueDateBTN,
  priorityBTN,
  storageBTN,
  containerContent,
  addTaskBTN,
  projectName
) {
  taskForm.reset();
  dueDateBTN.innerHTML = Button("Due date", dueDateSvg).innerHTML;
  priorityBTN.innerHTML = Button("Priority", prioritySvg).innerHTML;
  storageBTN.innerHTML = Button(projectName).innerHTML;
  addDropdownSvg(storageBTN);
  containerContent.innerHTML = "";
  const todoContainer = loadTodos(projectName);
  containerContent.append(todoContainer, addTaskBTN);
  todoCheckHandler();
  editHandler(containerContent);
  deleteHandler(containerContent);
}

function textareaReset() {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach((textarea) => {
    textarea.value = "";
    textarea.style.height = "45px";
  });
}

function todoCheckHandler() {
  const checkBTNs = document.querySelectorAll("button#checkBTN");

  checkBTNs.forEach((checkBTN) => {
    checkBTN.addEventListener("click", () => {
      const todoWrapper = checkBTN.closest(".todo-wrapper");
      todoWrapper.classList.toggle("checked");

      const todoDiv = todoWrapper.querySelector(".todo-div");
      todoDiv.classList.toggle("checked");

      checkBTN.classList.toggle("checked");

      const todo = {
        id: todoWrapper.classList[1],
        checked: checkBTN.classList[1] === "checked",
        projectName:
          todoWrapper.querySelector(".todo-project-text").textContent,
      };

      Storage.setStorage("projects", todo, "update");
    });
  });
}

function editHandler(containerContent) {
  const editBTNs = document.querySelectorAll("button#edit");
  const noteDivs = document.querySelectorAll(".note-div");

  if (editBTNs) {
    editBTNs.forEach((editBTN) => {
      editBTN.addEventListener("click", () => {
        const todoWrapper = editBTN.closest(".todo-wrapper");
        const projectDiv = editBTN.closest(".project-div");

        if (todoWrapper) {
          const dialog = document.querySelector("dialog");
          dialog.innerHTML = "";
          dialog.className = "edit-task-dialog";
          dialog.append(editTask(todoWrapper));
          dialog.showModal();

          const form = dialog.querySelector("form");
          addTaskEventListeners(form);

          const priorityBTN = form.querySelector("button#priority");
          const storageBTN = form.querySelector("button#storage");
          const cancelBTN = form.querySelector("button#cancel");

          cancelBTN.addEventListener("click", () => {
            dialog.close();
          });

          form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const dataObject = Object.fromEntries(formData);
            dataObject.priority = priorityBTN.textContent.toLowerCase();
            dataObject.projectName = storageBTN.textContent;
            dataObject.id = form.classList[1];

            Storage.setStorage("projects", dataObject, "update");

            dialog.remove();

            const content = document.getElementById("content");
            const dialogNew = generateModal(containerContent);

            content.appendChild(dialogNew);

            containerContent.innerHTML = "";
            addTaskRouteHandler(containerContent, storageBTN.textContent);
            dropdownEventListeners(containerContent);
            editHandler(containerContent);
            deleteHandler(containerContent);
          });
        }

        if (projectDiv) {
          const dialog = document.querySelector("dialog");
          dialog.innerHTML = "";
          dialog.className = "edit-project-dialog";
          dialog.append(editProject(projectDiv));
          dialog.showModal();

          const form = dialog.querySelector("form");

          const cancelBTN = form.querySelector("button#cancel");

          cancelBTN.addEventListener("click", () => {
            dialog.close();
          });

          form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const dataObject = Object.fromEntries(formData);
            dataObject.id = form.classList[1];
            dataObject.oldTitle =
              projectDiv.querySelector(".project-name").textContent;

            Storage.setStorage("projects", dataObject, "update");

            dialog.close();

            containerContent.innerHTML = "";
            addProjectRouteHandler(containerContent);
            dropdownEventListeners(containerContent);
            editHandler(containerContent);
            deleteHandler(containerContent);
          });
        }
      });
    });
  }

  if (noteDivs) {
    noteDivs.forEach((noteDiv) => {
      noteDiv.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        dialog.innerHTML = "";
        dialog.className = "edit-project-dialog";
        dialog.append(editNote(noteDiv));
        dialog.showModal();

        const form = dialog.querySelector("form");

        const closeBTN = form.querySelector("button#close");

        closeBTN.addEventListener("click", () => {
          dialog.close();
        });

        form.addEventListener("submit", (e) => {
          e.preventDefault();

          const formData = new FormData(form);
          const dataObject = Object.fromEntries(formData);
          dataObject.id = form.classList[1];

          Storage.setStorage("notes", dataObject, "update");

          dialog.close();

          const existingNoteContainer =
            document.querySelector(".notes-container");
          if (existingNoteContainer) {
            existingNoteContainer.remove();
          }

          const noteContainer = loadNotes();
          document.getElementById("content").appendChild(noteContainer);
          editHandler(containerContent);
          deleteHandler(containerContent);
        });
      });
    });
  }
}

function deleteHandler(containerContent) {
  const deleteBTNs = document.querySelectorAll("button#delete");
  const closeBTNs = document.querySelectorAll("button#close");

  if (deleteBTNs) {
    deleteBTNs.forEach((deleteBTN) => {
      deleteBTN.addEventListener("click", () => {
        const todoWrapper = deleteBTN.closest(".todo-wrapper");
        const projectDiv = deleteBTN.closest(".project-div");
        let projectName;

        if (todoWrapper) {
          projectName =
            todoWrapper.querySelector(".todo-project-text").textContent;
          const todo = {
            projectName:
              todoWrapper.querySelector(".todo-project-text").textContent,
            id: todoWrapper.classList[1],
          };

          Storage.setStorage("projects", todo, "delete");
          containerContent.innerHTML = "";
          addTaskRouteHandler(containerContent, projectName);
          deleteHandler(containerContent);
        }

        if (projectDiv) {
          projectName = projectDiv.querySelector(".project-name").textContent;
          const project = projectDiv.classList[1];

          Storage.setStorage("projects", project, "delete");
          containerContent.innerHTML = "";
          addProjectRouteHandler(containerContent);
          dropdownEventListeners(containerContent);
          editHandler(containerContent);
          deleteHandler(containerContent);
        }
      });
    });
  }

  if (closeBTNs) {
    closeBTNs.forEach((closeBTN) => {
      closeBTN.addEventListener("click", (e) => {
        e.stopPropagation();
        const noteCard = closeBTN.closest(".note-card");

        if (noteCard) {
          const note = noteCard.classList[1];

          Storage.setStorage("notes", note, "delete");

          const existingNoteContainer =
            document.querySelector(".notes-container");
          if (existingNoteContainer) {
            existingNoteContainer.remove();
          }

          const noteContainer = loadNotes();
          document.getElementById("content").appendChild(noteContainer);
          editHandler(containerContent);
          deleteHandler(containerContent);
        }
      });
    });
  }
}

function addTaskEventListeners(form) {
  const dueDateBTN = form.querySelector("button#due-date");
  const dateInput = form.querySelector("input[type='date']");

  const priorityDropdown = form.querySelector(".priority-dropdown");
  const priorityBTN = form.querySelector("button#priority");
  const priorityChoices = priorityDropdown.querySelectorAll("li button");

  const storageDropdown = form.querySelector(".storage-dropdown");
  const storageBTN = form.querySelector("button#storage");
  const storageChoices = storageDropdown.querySelectorAll("li button");

  dueDateBTN.addEventListener("click", () => {
    dateInput.showPicker();
  });

  dateInput.addEventListener("change", () => {
    formattedDateHandler(dateInput, dueDateBTN);
  });

  priorityBTN.addEventListener("click", () => {
    dropdownContentHandler(priorityBTN.id, form);
  });

  priorityChoices.forEach((button) => {
    button.addEventListener("click", () => {
      priorityBTN.innerHTML = button.innerHTML;
    });
  });

  storageBTN.addEventListener("click", (e) => {
    dropdownContentHandler(storageBTN.id, form);
  });

  storageChoices.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id !== "add-project") {
        storageBTN.innerHTML = button.innerHTML;
        const dropdown = document.createElement("img");
        dropdown.src = dropdownSvg;
        storageBTN.appendChild(dropdown);
      } else {
        const dialog = document.querySelector(".project-dialog");
        dialog.showModal();
      }
    });
  });
}

function dropdownEventListeners(containerContent) {
  containerContent.addEventListener("click", (e) => {
    const optionsButton = e.target.closest("#options");
    const dropdownButton = e.target.closest(".dropdown-button");

    if (optionsButton) {
      const wrapper = optionsButton.closest("div");
      const dropdown = wrapper.querySelector(".dropdown-items");

      document.querySelectorAll(".dropdown-items.show").forEach((dd) => {
        if (dd !== dropdown) dd.classList.remove("show");
      });
      dropdown.classList.toggle("show");
    }

    if (!dropdownButton) {
      document.querySelectorAll(".dropdown-items.show").forEach((dd) => {
        dd.classList.remove("show");
      });
    }
  });
}

function showTodosInProject() {
  const projectDivs = document.querySelectorAll(".project-name");

  projectDivs.forEach((projectDiv) => {
    projectDiv.addEventListener("click", () => {
      const dialog = document.createElement("dialog");
      dialog.className = "project-todos-dialog";

      const projectName = projectDiv.textContent;

      dialog.append(todoProjectModal(projectDiv));

      dialog.addEventListener("click", (e) => {
        if (e.target.closest("form")) return;

        const dialogDimensions = dialog.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialog.close();
        }
      });

      const containerContent = dialog.querySelector(".container-content");

      addTaskRouteHandler(containerContent, projectName);

      document.getElementById("content").appendChild(dialog);
      dialog.showModal();
      todoCheckHandler();
      dropdownEventListeners(containerContent);
      editHandler(containerContent);
      deleteHandler(containerContent);
    });
  });
}
