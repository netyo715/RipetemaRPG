import { AreaId, DungeonId } from "../data/define/map";
import { MonsterId } from "../data/define/monster";
import { SkillId } from "../data/define/skill";
import { AREA_INFO, DUNGEON_INFO } from "../data/parameter/map";
import { MONSTER_INFO } from "../data/parameter/monster";
import { SKILL_INFO } from "../data/parameter/skill";
import { Area, Dungeon } from "../types/map";
import { Monster } from "../types/monster";
import { Skill } from "../types/skill";

export function getValueRandom<T>(array: T[]): T{
  return array[Math.floor(Math.random() * array.length)];
}

export function getSkill(id: SkillId): Skill{
  const info = SKILL_INFO[id];
  return {
    id: id,
    type: info.skillType,
    name: info.name,
    coolDown: info.coolDown,
    behavior: info.behavior,
  }
}

export function getMonster(id: MonsterId): Monster{
  const info = MONSTER_INFO[id];
  return {
    id: info.id,
    name: info.name,
    status: {...info.status},
    exp: info.exp,
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