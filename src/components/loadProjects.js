import Storage from "../classes/Storage";
import Button from "./Button";
import projectSvg from "../assets/images/projects-dropdown.svg";
import Options from "./Options";

export default function loadProjects() {
  const projects = Storage.getStorage("projects");

  const container = document.createElement("div");
  container.classList.add("project-container");

  projects.forEach((project) => {
    const [key] = Object.keys(project);

    if (key !== "Inbox") {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-div");
      projectDiv.classList.add(`${project[key].id}`);

      const title = Button(key, projectSvg);
      title.classList.add("project-name");

      const optionsDiv = Options();

      projectDiv.append(title, optionsDiv);
      container.append(projectDiv);
    }
  });

  return container;
}
