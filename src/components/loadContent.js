import Button from "./Button";
import addSvg from "../assets/images/add.svg";

export default function loadContent(name = "Inbox") {
  const content = document.getElementById("content");

  content.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("container");

  const containerTitle = document.createElement("h1");
  containerTitle.classList.add("container-title");
  containerTitle.textContent = name;

  const containerContent = document.createElement("div");
  containerContent.classList.add("container-content");

  const addTaskBTN = Button("Add task", addSvg);

  containerContent.append(addTaskBTN);

  container.append(containerTitle, containerContent);

  content.append(container);
}
