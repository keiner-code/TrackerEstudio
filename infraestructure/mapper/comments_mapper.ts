import { ProjectComment } from "@/interfaces";

export class CommentsMapper {
  static dbToJson(item: any): ProjectComment {
    return {
      content: item.content ?? "",
      created_at: item.created_at ?? "",
      id: item.id ?? "",
      project_id: item.project_id,
      updated_at: item.updated_at,
    };
  }
}
