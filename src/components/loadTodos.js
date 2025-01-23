import Storage from "../classes/Storage";
import checkSvg from "../assets/images/check.svg";

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

      const checkBTN = document.createElement("button");
      checkBTN.classList.add(
        "check",
        todoInfo.priority !== "priority" ? todoInfo.priority : "none"
      );

      const img = document.createElement("img");
      img.src = checkSvg;
      checkBTN.appendChild(img);

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-div");

      const todoTextDiv = document.createElement("div");
      todoTextDiv.classList.add("todo-text");

      const todoOtherObj = document.createElement("div");
      todoOtherObj.classList.add("todo-others");

      const title = document.createElement("p");
      title.textContent = todoInfo.title;

      const description = document.createElement("p");
      description.textContent = todoInfo.description;

      const dueDate = document.createElement("p");
      dueDate.textContent = todoInfo.date;

      const projectName = document.createElement("p");
      projectName.textContent = key;

      todoTextDiv.append(title, description);
      todoOtherObj.append(dueDate, projectName);
      todoDiv.append(todoTextDiv, todoOtherObj);

      todoWrapper.append(checkBTN, todoDiv);
      childContainer.appendChild(todoWrapper);
    });

    container.appendChild(childContainer);
  });

  return container;
}
