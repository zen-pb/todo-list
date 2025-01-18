import projectSvg from "../assets/images/projects-dropdown.svg";
import Storage from "../classes/Storage";
import Button from "./Button";
import inboxSvg from "../assets/images/inbox-dropdown.svg";
import addSvg from "../assets/images/add.svg";

export default function storageList() {
  const data = Storage.getStorage("projects");

  const projectNames = data.map((name) => Object.keys(name)[0]);

  let list = [];

  projectNames.forEach((name) => {
    if (name === "Inbox") {
      list.push(Button("Inbox", inboxSvg));
    } else {
      list.push(Button(name, projectSvg));
    }
  });

  list.push(Button("Add project", addSvg));
  return list;
}
