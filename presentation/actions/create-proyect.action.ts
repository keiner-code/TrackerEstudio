import { ProjectDao } from "../../infraestructure/data/dao/project-dao";
import { createProject } from "../../interfaces";

const projectDao = new ProjectDao();

export const createProjectAction = async (projectData: createProject) => {
  try {
    const result = await projectDao.create(projectData);

    if (result) {
      return {
        ok: true,
        id: result,
        message: "Proyecto creado exitosamente.",
      };
    }
    return {
      ok: false,
      message: "Error en la base de datos al crear el proyecto.",
    };
  } catch (error) {
    console.error("Error en createProjectAction:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado.",
    };
  }
};
