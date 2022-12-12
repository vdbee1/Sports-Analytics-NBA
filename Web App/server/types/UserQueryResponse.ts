import { User } from "./User"
export type UserQueryResponse = {
  status: string,
  title: string,
  text: string | null,
  user: User | null
}
