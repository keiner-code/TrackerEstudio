import { User } from "@/interfaces";

export class UserMapper {
  static dbToJson(item: any): User {
    return {
      id: item.id,
      age: String(item.age) ?? "",
      lastName: item.last_name ?? "",
      name: item.name ?? "",
      photo: item.photo ?? null,
      created_at: item.created_at ?? "",
      updated_at: item.updated_at ?? "",
    };
  }
}
