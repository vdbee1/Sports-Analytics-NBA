/**
 * How we search the database for teams, players, etc.
 */
export type SQLsearchterm = {
  /**Are we searching for a team or player */
  type: "Team" | "Player",
  /**Any stat or 'PlayerName' */
  term: string,
  /**Query logic. If numeric, use the logical comparators, otherwise search for strings with "includes","startsWith","endsWith" */
  comparator: Comparator,
  /**The search term being used */
  value: string
}

export enum Comparator {
  ">" = ">", ">=" = ">=", "=" = "=", "<=" = "<=", "<" = "<", "includes" = "includes", "startsWith" = "startsWith", "endsWith" = "endsWith"
}