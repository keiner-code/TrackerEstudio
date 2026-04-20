import { Project } from "@/interfaces";
import { CommentsMapper } from "./comments_mapper";
import { LanguageMapper } from "./language_mapper";

export class ProjectMapper {
  static dbToJson(item: any): Project {
    return {
      comments:
        item.comments?.map((value: any) => CommentsMapper.dbToJson(value)) ??
        [],
      created_at: item.created_at ?? "",
      description: item.description,
      hours_per_day: item.hours_per_day ?? 0,
      total_hours: item.total_hours ?? 0,
      study_day: item.study_day ?? "",
      id: item.id,
      language: LanguageMapper.dbToJson({ ...item }),
      progress: item.progress ?? 0,
      status: item.status ?? "",
      title: item.title ?? "",
      updated_at: item.updated_at ?? "",
    };
  }
}
