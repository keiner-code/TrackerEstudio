import { ProjectDao } from "@/infraestructure/data/dao/project-dao";
import { UpdateProject } from "@/interfaces";

export default async function updateProject(
  project: UpdateProject,
): Promise<boolean> {
  const projectDao = new ProjectDao();
  try {
    return await projectDao.update(project);
  } catch (error) {
    console.error("Error al actualizar el proyecto", error);
    return false;
  }
}
