import addTaskButton from "./addTaskButton";

export default function loadContent(name = "Inbox") {
  const content = document.getElementById("content");

  content.innerHTML = "";

  const container = document.createElement("div");

  const containerTitle = document.createElement("h1");
  containerTitle.textContent = name;

  const containerContent = document.createElement("div");

  const addTaskBTN = addTaskButton();

  containerContent.append(addTaskBTN);

  container.append(containerTitle, containerContent);

  content.append(container);
}
