import { LanguageDao } from "@/infraestructure/data/dao/language-dao";
import { CreateLanguage } from "@/interfaces";

export async function createLanguageAction(language: CreateLanguage) {
  try {
    const languageDao = new LanguageDao();
    const result = await languageDao.create(language);

    if (result) {
      return {
        ok: true,
        id: result,
        message: "Lenguaje creado exitosamente.",
      };
    }
    return {
      ok: false,
      message: "Error en la base de datos al crear el lenguaje.",
    };
  } catch (error) {
    console.error("Error en createLenguageAction:", error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado.",
    };
  }
}
