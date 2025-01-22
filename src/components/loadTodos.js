import Storage from "../classes/Storage";
import checkSvg from "../assets/images/check.svg";

export default function loadTodos() {
  const todos = Storage.getStorage("projects");

  const container = document.createElement("div");
  container.classList.add("todo-container");
  todos.forEach((todo) => {
    const checkBTN = document.createElement("button");
    checkBTN.classList.add("check");

    const img = document.createElement("img");
    img.src = checkSvg;

    checkBTN.append(img);

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("todo-text");

    const todoOtherObj = document.createElement("div");
    todoOtherObj.classList.add("todo-others");

    const [key] = Object.keys(todo);

    const todoItem = todo[key];

    todoItem.list.forEach((todoInfo) => {
      const title = document.createElement("p");
      title.textContent = todoInfo.title;

      const description = document.createElement("p");
      description.textContent = todoInfo.description;

      const dueDate = document.createElement("p");
      dueDate.textContent = todoInfo.date;

      checkBTN.classList.add(todoInfo.priority);

      todoTextDiv.append(title, description);
      todoOtherObj.append(dueDate, key);
      todoDiv.append(todoTextDiv, todoOtherObj);
      container.append(checkBTN, todoDiv);
    });
  });

  return container;
}
