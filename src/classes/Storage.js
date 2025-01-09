export default class Storage {
  static setStorage(data) {
    localStorage.setItem("todo-list", JSON.stringify(data));
  }

  static getStorage() {
    return JSON.parse(localStorage.getItem("todo-list"));
  }
}
