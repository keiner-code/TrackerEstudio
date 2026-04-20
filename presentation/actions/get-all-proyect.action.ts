import { ProjectDao } from "@/infraestructure/data/dao/project-dao";
import { Project } from "@/interfaces";

export default async function getAllProyectsAction(): Promise<Project[]> {
  try {
    const dao = new ProjectDao();
    const projects = await dao.getAll();

    if (projects.length === 0) return [];

    return projects;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
