import { UserDao } from "@/infraestructure/data/dao/user-dao";

export async function createUserAction(
  name: string,
  lastName: string,
  age: number,
  photo: string | null = null
) {
  try {
    const user = new UserDao();
    const result = await user.create(name, lastName, age, photo);

    if (result) {
      return {
        ok: true,
        id: result,
        message: "Usuario creado exitosamente.",
      };
    }
    return {
      ok: false,
      message: "Error en la base de datos al crear el usuario.",
    };
  } catch (error) {
    console.error("Error en createUserAction:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado.",
    };
  }
}
