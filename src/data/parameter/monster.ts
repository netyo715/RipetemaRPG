import { Status } from "../../types/status";
import { MonsterId } from "../define/monster";

type MonsterInfo = {
  [key in MonsterId]: {name: string, status: Status};
};

export const MONSTER_INFO: MonsterInfo = {
  [MonsterId.TestMonster]: {
    name: "テストモンスター",
    status: {
      hp: 10,
      atk: 1,
      def: 1,
      mat: 1,
      mdf: 1,
      spd: 1,
      crt: 1,
    }
  }
};