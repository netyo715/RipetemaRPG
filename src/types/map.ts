import { AreaId, DungeonId } from "../data/define/map";
import { MonsterId } from "../data/define/monster";

export type Dungeon= {
  id: DungeonId;
  name: string;
  areaIds: AreaId[];
}

export type Area = {
  id: AreaId;
  name: string;
  monsterPatterns: MonsterPattern[];
}

export type MonsterPattern = {
  weight: number;
  monsterIds: MonsterId[];
}