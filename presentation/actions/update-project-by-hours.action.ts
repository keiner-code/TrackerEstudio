import { ProjectDao } from "@/infraestructure/data/dao/project-dao";

export default async function updateProjectByHoursAction(
  id: number,
  current_total_hours: number,
  hours_for_day: number,
): Promise<boolean> {
  const projectDao = new ProjectDao();
  try {
    const isUpdateHoursForDay = await projectDao.updateHoursForDay(
      id,
      hours_for_day,
    );

    if (!isUpdateHoursForDay) return false;
    console.log(current_total_hours, hours_for_day);

    const total_hours = current_total_hours + hours_for_day;

    const response = await projectDao.updateByTotalHours(id, total_hours);
    return response;
  } catch (error) {
    console.error("Error al actualizar las del proyecto", error);
    return false;
  }
}
