import generateNewProjectModal from "./generateNewProjectModal";

export default function editProject(projectDiv) {
  const editProjectForm = generateNewProjectModal();

  const projectName = projectDiv.querySelector(".project-name").textContent;

  const projectFormTitle = editProjectForm.querySelector("h1");
  projectFormTitle.textContent = "Edit project";
  const projectFormName = editProjectForm.querySelector("input");
  projectFormName.value = projectName;
  const projectFormSave = editProjectForm.querySelector("button#add");
  projectFormSave.textContent = "Save";
  projectFormSave.id = "save";

  return editProjectForm;
}
