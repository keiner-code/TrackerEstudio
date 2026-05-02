import { UserDao } from "@/infraestructure/data/dao/user-dao";
import { User } from "@/interfaces";

export async function updateUserAction(updateUser: User) {
  try {
    const user = new UserDao();
    const result = await user.update(updateUser);

    return result;
  } catch (error) {
    console.error("Error en updateUserAction:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado.",
    };
  }
}
