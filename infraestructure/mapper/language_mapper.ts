import { Language } from "@/interfaces";

export class LanguageMapper {
  static dbToJson(item: any): Language {
    return {
      color: item.color ?? "",
      created_at: item.created_at ?? "",
      icon: item.icon ?? "",
      id: item.id,
      name: item.name ?? "",
      project_size: item.project_size,
      status: item.status ?? "",
      updated_at: item.updated_at ?? "",
    };
  }
}
