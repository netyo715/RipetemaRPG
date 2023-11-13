import { AreaId, DungeonId } from "../data/define/map";
import { MonsterId } from "../data/define/monster";
import { AREA_INFO, DUNGEON_INFO } from "../data/parameter/map";
import { MONSTER_INFO } from "../data/parameter/monster";
import { Area, Dungeon } from "../types/map";
import { Monster } from "../types/monster";

export function getMonster(id: MonsterId): Monster{
  const info = MONSTER_INFO[id];
  return {
    id: id,
    name: info.name,
    status: info.status,
  }
}

export function getDungeon(id: DungeonId): Dungeon{
  const info = DUNGEON_INFO[id];
  return {
    id: id,
    name: info.name,
    areaIds: info.areaIds,
  }
}

export function getArea(id: AreaId): Area{
  const info = AREA_INFO[id];
  return {
    id: id,
    name: info.name,
    monsterPatterns: info.monsterPatterns,
  }
}