import { ItemId } from "../data/item";
import { MonsterId } from "../data/monster";
import { SkillId } from "../data/skill";
import { Status } from "./battle";

/**
 * モンスター
 */
export type Monster = {
  monsterId: MonsterId;
  name: string;
  status: Status;
  skillIds: SkillId[];
  experience: number;
  lootTable: LootTable;
};

/**
 * ドロップ候補
 * 各アイテムはweight/(lootsのweightの合計+nonDropWeight)の確率でドロップ
 * @param loots ドロップするアイテムと個数、重み
 * @param nonDropWeight 非ドロップの重み
 */
export type LootTable = {
  loots: {
    itemId: ItemId;
    amount: number;
    weight: number;
  }[];
  nonDropWeight: number;
};
