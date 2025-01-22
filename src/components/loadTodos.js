import Storage from "../classes/Storage";

export default function loadTodos() {
  const todos = Storage.getStorage("projects");

  todos.forEach((todo) => {
    const container = document.createElement("div");
    container.classList.add("todo-container");
  });
}
