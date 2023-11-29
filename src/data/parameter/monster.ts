import { Monster } from "../../types/monster";
import { MonsterId } from "../define/monster";

type MonsterInfo = {
  [key in MonsterId]: Monster;
};

export const MONSTER_INFO: MonsterInfo = {
  [MonsterId.TestMonster]: {
    id: MonsterId.TestMonster,
    name: "テストモンスター",
    status: {
      hp: 100,
      atk: 5,
      def: 1,
      mat: 1,
      mdf: 1,
      spd: 3,
      crt: 1,
    },
    exp: 300,
  }
};