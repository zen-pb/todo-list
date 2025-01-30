export default function todoProjectModal(projectDiv) {
  const div = document.createElement("div");

  const containerTitle = document.createElement("h1");
  containerTitle.classList.add("container-title");
  containerTitle.textContent = projectDiv.textContent;

  const containerContent = document.createElement("div");
  containerContent.classList.add("container-content");

  div.append(containerTitle, containerContent);

  return div;
}
