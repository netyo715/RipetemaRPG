import { MonsterId } from "../data/define/monster"
import { Status } from "./status"

export type Monster = {
  id: MonsterId,
  name: string,
  status: Status,
  exp: number,
}