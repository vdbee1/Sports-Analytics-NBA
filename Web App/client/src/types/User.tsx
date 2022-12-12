export type User = {
  name: string,
  email: string,
  password: string,
  room_id: string | null,
  team_id: string | null,
  role: string
}