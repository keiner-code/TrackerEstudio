import { LanguageDao } from "@/infraestructure/data/dao/language-dao";
import { Language } from "@/interfaces";

export default async function getAllLanguageAction(): Promise<Language[]> {
  try {
    const dao = new LanguageDao();
    const language = await dao.getAll();

    if (language.length === 0) return [];

    return language;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
