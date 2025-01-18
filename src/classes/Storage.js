export default class Storage {
  static setStorage(storageName, data) {
    let storedItem;

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
}
