import Storage from "../classes/Storage";
import Button from "./Button";
import dropdownSvg from "../assets/images/dropdown.svg";

export default function loadProjects() {
  const projects = Storage.getStorage("projects");

  const container = document.createElement("div");
  container.classList.add("project-container");

  projects.forEach((project) => {
    const [key] = Object.keys(project);

    if (key !== "Inbox") {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-div");

      const title = Button(key);
      const dropdown = document.createElement("img");
      dropdown.src = dropdownSvg;

      title.appendChild(dropdown);

      projectDiv.append(title);
      container.append(projectDiv);
    }
  });

  return container;
}
