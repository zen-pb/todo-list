import Notes from "./Notes";
import Project from "./Projects";

export default class Storage {
  static setStorage(storageName, data, option) {
    let storedItem;

    if (option === "store") {
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
    }

    if (option === "update") {
      if (storageName === "projects") {
        storedItem = this.getStorage(storageName) || [];

        const projectName = data.projectName;
        const project = storedItem.find((proj) => proj[projectName]);
        delete data.projectName;

        if (project) {
          const listArray = project[projectName].list;
          console.log(listArray);
          listArray.forEach((todo) => {
            if (todo.id === data.id) {
              todo.title = data.title;
              todo.description = data.description;
              todo.date = data.date;
              todo.priority = data.priority;
              return;
            }
          });
        }
      }
    }

    if (option === "delete") {
      if (storageName === "projects") {
        storedItem = this.getStorage(storageName);

        const projectName = data.projectName;
        const project = storedItem.find((proj) => proj[projectName]);
        delete data.projectName;

        if (project) {
          project[projectName].list = project[projectName].list.filter(
            (todo) => todo.id !== data.id
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
    this.setStorage("projects", new Project("Inbox"), "store");
    this.setStorage(
      "notes",
      new Notes("This is a note.", "No, seriously. This is a note."),
      "store"
    );
  }
}
