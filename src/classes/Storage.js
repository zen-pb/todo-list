import Project from "./Projects";

export default class Storage {
  static setStorage(storageName, data) {
    let storedItem;

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

    localStorage.setItem(storageName, JSON.stringify(storedItem));
  }

  static getStorage(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  }

  static generateData() {
    console.log("Here");
    this.setStorage("projects", new Project("Inbox"));
  }
}
