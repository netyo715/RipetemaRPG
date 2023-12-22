import { BattleUnit } from "../features/main_contents/battle_unit"
import { getRandomValue } from "./utils";

export function getAliveUnits(battleUnits: BattleUnit[]): BattleUnit[]{
  return battleUnits.filter(unit => !unit.isDead);
}

export function getRandomAliveUnit(battleUnits: BattleUnit[]): BattleUnit{
  return getRandomValue(getAliveUnits(battleUnits));
}