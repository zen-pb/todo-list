import Todo from "./Todo";

export default class TodoList {
  constructor() {
    this.list = [];
  }

  setList(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    this.list.push(todo);
  }

  getList() {
    return this.list;
  }
}
