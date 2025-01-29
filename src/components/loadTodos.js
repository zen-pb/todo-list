import Storage from "../classes/Storage";
import checkSvg from "../assets/images/check.svg";
import Options from "./Options";
import { format, getYear } from "date-fns";

export default function loadTodos() {
  const todos = Storage.getStorage("projects");
  const container = document.createElement("div");
  container.classList.add("todo-parent-container");

  todos.forEach((todo) => {
    const [key] = Object.keys(todo);
    const todoItem = todo[key];

    const childContainer = document.createElement("div");
    childContainer.classList.add("todo-child-container");

    todoItem.list.forEach((todoInfo) => {
      const todoWrapper = document.createElement("div");
      todoWrapper.classList.add("todo-wrapper");
      todoWrapper.classList.add(`${todoInfo.id}`);

      const checkBTN = document.createElement("button");
      checkBTN.classList.add(
        todoInfo.priority !== "priority" ? todoInfo.priority : "none"
      );
      checkBTN.id = "checkBTN";

      const img = document.createElement("img");
      img.src = checkSvg;
      checkBTN.appendChild(img);

      const optionsDiv = Options();

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-div");

      const todoTextDiv = document.createElement("div");
      todoTextDiv.classList.add("todo-text");

      const todoOtherObj = document.createElement("div");
      todoOtherObj.classList.add("todo-others");

      const title = document.createElement("p");
      title.textContent = todoInfo.title;
      title.classList.add("todo-title-text");

      const description = document.createElement("p");
      description.textContent = todoInfo.description;
      description.classList.add("todo-desc-text");

      const dueDate = document.createElement("p");

      if (todoInfo.date !== "") {
        const date = new Date(todoInfo.date);

        dueDate.textContent = date.toString().includes(`${getYear(new Date())}`)
          ? format(date, "dd MMM")
          : format(date, "dd MMM yyyy");
        dueDate.classList.add("todo-due-date");
      }

      const projectName = document.createElement("p");
      projectName.textContent = key;
      projectName.classList.add("todo-project-text");

      todoTextDiv.append(title, description);
      todoOtherObj.append(dueDate, projectName);
      todoDiv.append(todoTextDiv, todoOtherObj);

      todoWrapper.append(checkBTN, todoDiv, optionsDiv);
      childContainer.appendChild(todoWrapper);
    });

    container.appendChild(childContainer);
  });

  return container;
}
