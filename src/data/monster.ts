import { Monster } from "../types/monster";
import { ItemId } from "./item";

/**
 * モンスターID
 */
export enum MonsterId {
  "スライム" = "M000",
  "つのうさぎ" = "M001",
}

/**
 * モンスター
 */
export const MONSTER_INFO: MonsterInfo = {
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
      hat: 100,
    },
    skillIds: [],
    experience: 1,
    gold: 1,
    lootTable: {
      loots: [],
      nonDropWeight: 1,
    },
  },
  [MonsterId.つのうさぎ]: {
    monsterId: MonsterId.つのうさぎ,
    name: "つのうさぎ",
    status: {
      hp: 50,
      atk: 7,
      def: 5,
      mat: 0,
      mdf: 0,
      spd: 5,
      hst: 0,
      crt: 5,
      hat: 100,
    },
    skillIds: [],
    experience: 3,
    gold: 3,
    lootTable: {
      loots: [
        { itemId: ItemId.獣の皮, amount: 1, weight: 1 },
        { itemId: ItemId.獣の骨, amount: 1, weight: 1 },
      ],
      nonDropWeight: 2,
    },
  },
};

type MonsterInfo = {
  [monsterId in MonsterId]: Monster;
};
