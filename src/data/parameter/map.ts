import { MonsterPattern } from "../../types/map";
import { AreaId, DungeonId } from "../define/map";
import { MonsterId } from "../define/monster";

type DungeonInfo = {
  [key in DungeonId]: {name: string, areaIds: AreaId[]};
};

type AreaInfo = {
  [key in AreaId]: {name: string, monsterPatterns: MonsterPattern[]};
};

export const DUNGEON_INFO: DungeonInfo = {
  [DungeonId.TestDungeon1]: {
    name: "TestDungeon1",
    areaIds: [AreaId.TestArea1_1, AreaId.TestArea1_2],
  },
  [DungeonId.TestDungeon2]: {
    name: "TestDungeon2",
    areaIds: [AreaId.TestArea2_1, AreaId.TestArea2_2],
  },
};

export const AREA_INFO: AreaInfo = {
  [AreaId.TestArea1_1]: {
    name: "TestArea1_1",
    monsterPatterns: [
      {weight: 1, monsterIds: [MonsterId.TestMonster]},
    ],
  },
  [AreaId.TestArea1_2]: {
    name: "TestArea1_2",
    monsterPatterns: [
      {weight: 1, monsterIds: [MonsterId.TestMonster]},
    ],
  },
  [AreaId.TestArea2_1]: {
    name: "TestArea2_1",
    monsterPatterns: [
      {weight: 1, monsterIds: [MonsterId.TestMonster]},
    ],
  },
  [AreaId.TestArea2_2]: {
    name: "TestArea2_2",
    monsterPatterns: [
      {weight: 1, monsterIds: [MonsterId.TestMonster]},
    ],
  },
};