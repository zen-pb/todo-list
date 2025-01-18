import TodoList from "./TodoList";

export default class Project {
  constructor(title, description = "") {
    this[title] = {
      description: description,
      list: new TodoList(),
    };
  }

  setTitle(title) {
    this.project.title = title;
  }

  getTitle() {
    return this.project.title;
  }

  setDescription(description) {
    this.project.description = description;
  }

  getDescription() {
    return this.project.description;
  }

  setList(title, description, dueDate, priority) {
    this.project.list.setList(title, description, dueDate, priority);
  }

  getList() {
    return this.project.list.getList();
  }
}
