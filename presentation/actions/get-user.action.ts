import { UserDao } from "@/infraestructure/data/dao/user-dao";
import { User } from "@/interfaces";

export default async function getUserAction(): Promise<User | null> {
  try {
    const dao = new UserDao();
    const user = await dao.getUser();

    if (user === null) return null;

    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
