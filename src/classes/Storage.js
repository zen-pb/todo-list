import Notes from "./Notes";
import Project from "./Projects";

export default class Storage {
  static setStorage(storageName, data, del = false) {
    let storedItem;

    if (!del) {
      if (storageName === "projects") {
        storedItem = this.getStorage(storageName) || [];

        const projectName = data.projectName;
        const project = storedItem.find((proj) => proj[projectName]);
        delete data.projectName;

        if (project) {
          project[projectName].list.push(data);
        } else {
          storedItem.push(data);
        }
      }

      if (storageName === "notes") {
        storedItem = this.getStorage(storageName) || [];
        storedItem.push(data);
      }
    } else {
      if (storageName === "projects") {
        storedItem = this.getStorage(storageName);

        const projectName = data.projectName;
        const project = storedItem.find((proj) => proj[projectName]);
        delete data.projectName;

        if (project) {
          project[projectName].list = project[projectName].list.filter(
            (todo) => todo.title !== data.title
          );
        }
      }
    }

    localStorage.setItem(storageName, JSON.stringify(storedItem));
  }

  static getStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  }

  static generateData() {
    this.setStorage("projects", new Project("Inbox"));
    this.setStorage(
      "notes",
      new Notes("This is a note.", "No, seriously. This is a note.")
    );
  }
}
