import { Monster } from "../types/monster";
import { ItemId } from "./item";

/**
 * モンスターID
 */
export enum MonsterId {
  "スライム" = "M000",
}

/**
 * モンスター
 */
export const MONSTER_INFO: MonsterInfo = {
  // TODO 仮
  [MonsterId.スライム]: {
    monsterId: MonsterId.スライム,
    name: "スライム",
    status: {
      hp: 20,
      atk: 3,
      def: 3,
      mat: 0,
      mdf: 3,
      spd: 3,
      hst: 0,
      crt: 0,
      hat: 1,
    },
    skillIds: [],
    experience: 1,
    lootTable: {
      loots: [
        { itemId: ItemId.木の板, amount: 1, weight: 2 },
        { itemId: ItemId.木の板, amount: 2, weight: 1 },
      ],
      nonDropWeight: 1,
    },
  },
};

type MonsterInfo = {
  [monsterId in MonsterId]: Monster;
};
