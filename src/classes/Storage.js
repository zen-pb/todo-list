import Notes from "./Notes";
import Project from "./Projects";

export default class Storage {
  static setStorage(storageName, data) {
    let storedItem;

    if (storageName == "projects") {
      storedItem = this.getStorage(storageName)
        ? this.getStorage(storageName)
        : [];

      storedItem.push(data);
    }

    if (storageName == "notes") {
      storedItem = this.getStorage(storageName)
        ? this.getStorage(storageName)
        : [];

      storedItem.push(data);
    }

    localStorage.setItem(storageName, JSON.stringify(storedItem));
  }

  static getStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  }

  static generateData() {
    this.setStorage("projects", new Project("Inbox"));
  }
}
