import { ItemId } from "../data/define/item";
import { MonsterId } from "../data/define/monster"
import { Status } from "./status"

export type Monster = {
  id: MonsterId,
  name: string,
  status: Status,
  exp: number,
  lootTable: LootInfo[];
}

export type LootInfo = {
  itemId: ItemId,
  amount: number,
  dropRate: number,
}