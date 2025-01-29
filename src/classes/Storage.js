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

        if (data.projectName) {
          const projectName = data.projectName;
          const project = storedItem.find((proj) => proj[projectName]);
          delete data.projectName;

          if (project) {
            const listArray = project[projectName].list;
            listArray.forEach((todo) => {
              if (todo.id === data.id) {
                Object.keys(data).forEach((key) => {
                  if (key in todo) {
                    todo[key] = data[key];
                  }
                });
                return;
              }
            });
          }
        } else {
          const currentProjectName = data.oldTitle;
          const newProjectName = data.newTitle;

          const targetIndex = storedItem.findIndex((proj) =>
            proj.hasOwnProperty(currentProjectName)
          );

          if (targetIndex !== -1) {
            const value = storedItem[targetIndex][currentProjectName];
            delete storedItem[targetIndex][currentProjectName];
            storedItem[targetIndex][newProjectName] = value;
          }
        }
      }

      if (storageName === "notes") {
        storedItem = this.getStorage(storageName) || [];

        storedItem.forEach((note) => {
          if (data.id === note.id) {
            Object.keys(data).forEach((key) => {
              if (key in note) {
                note[key] = data[key];
              }
            });
            return;
          }
        });
      }
    }

    if (option === "delete") {
      if (storageName === "projects") {
        storedItem = this.getStorage(storageName);

        if (data.projectName) {
          const projectName = data.projectName;
          const project = storedItem.find((proj) => proj[projectName]);
          delete data.projectName;

          if (project) {
            project[projectName].list = project[projectName].list.filter(
              (todo) => todo.id !== data.id
            );
          }
        } else {
          const index = storedItem.findIndex((proj) =>
            proj.hasOwnProperty(data)
          );

          if (index !== -1) {
            storedItem.splice(index, 1);
          }
        }
      }

      if (storageName === "notes") {
        storedItem = this.getStorage(storageName);

        storedItem = storedItem.filter((note) => note.id !== data);
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
