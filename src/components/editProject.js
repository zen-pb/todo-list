import generateNewProjectModal from "./generateNewProjectModal";

export default function editProject(projectDiv) {
  const modal = generateNewProjectModal();

  const editProjectForm = modal.querySelector("form");

  const projectID = projectDiv.classList[1];
  const projectName = projectDiv.querySelector(".project-name").textContent;

  editProjectForm.classList.add(projectID);
  const projectFormTitle = editProjectForm.querySelector("h1");
  projectFormTitle.textContent = "Edit project";
  const projectFormName = editProjectForm.querySelector("input");
  projectFormName.value = projectName;
  projectFormName.name = "newTitle";
  const projectFormSave = editProjectForm.querySelector("button#add");
  projectFormSave.textContent = "Save";
  projectFormSave.id = "save";

  return editProjectForm;
}
