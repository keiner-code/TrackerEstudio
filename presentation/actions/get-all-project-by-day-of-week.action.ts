import { ProjectDao } from "@/infraestructure/data/dao/project-dao";
import { Project } from "@/interfaces";

export async function getAllProjectByDayOfWeekAction(
  study_day: string,
): Promise<Project[]> {
  try {
    const dao = new ProjectDao();
    const data = await dao.getAllProjectByDayOfWeek(study_day);

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
