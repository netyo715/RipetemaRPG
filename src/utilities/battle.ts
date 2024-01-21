import { MONSTER_INFO, MonsterId } from "../data/monster";
import { SKILL_INFO, SkillId } from "../data/skill";
import { Adventurer } from "../types/adventurer";
import { BattleUnit } from "../types/battle";
import { MonsterPattern } from "../types/dungeon";
import { ActiveSkill, PassiveSkill } from "../types/skill";
import { getAdventurerSkillIds, getAdventurerStatus } from "./adventurer";
import { getRandomId } from "./util";

/**
 * 冒険者から戦闘ユニットオブジェクトを作成する
 * @param adventurer 冒険者
 * @returns 戦闘ユニットオブジェクト
 */
export const createBattleUnitFromAdventurer: (
  adventurer: Adventurer
) => BattleUnit = (adventurer) => {
  const status = getAdventurerStatus(adventurer);
  const skillIds = getAdventurerSkillIds(adventurer);
  const unit: BattleUnit = {
    id: getRandomId(),
    name: adventurer.name,
    status: { currentHp: status.hp, ...status },
    skills: getBattleUnitSkills(skillIds),
    isAlive: true,
  };
  return unit;
};

/**
 * モンスターIDから戦闘ユニットオブジェクトを作成する
 * @param monsterId モンスターのID
 * @returns 戦闘ユニットオブジェクト
 */
export const createBattleUnitFromMonsterId: (
  monsterId: MonsterId
) => BattleUnit = (monsterId) => {
  const monster = MONSTER_INFO[monsterId];
  const skillIds = monster.skillIds;
  const unit: BattleUnit = {
    id: getRandomId(),
    name: monster.name,
    status: { currentHp: monster.status.hp, ...monster.status },
    skills: getBattleUnitSkills(skillIds),
    isAlive: true,
  };
  return unit;
};

/**
 * 出現率に基づきランダムにモンスターIDを返す
 * @param monsterPatterns モンスター出現パターン
 * @returns モンスターID
 */
export const getRandomMonsterIdsFromMonsterPattern = (
  monsterPatterns: MonsterPattern[]
): MonsterId[] => {
  let weightSum = 0;
  monsterPatterns.forEach((pattern) => (weightSum += pattern.weight));
  let number = Math.random() * weightSum;
  for (const pattern of monsterPatterns) {
    number -= pattern.weight;
    if (number <= 0) {
      return pattern.monsterIds;
    }
  }
  throw Error;
};

/**
 * スキルIDからスキルを返す
 * @param skillIds スキルID
 * @returns スキル
 */
const getBattleUnitSkills: (skillIds: SkillId[]) => {
  activeSkills: ActiveSkill[];
  onAttackSkills: PassiveSkill[];
  onHitSkills: PassiveSkill[];
  onDefenceSkills: PassiveSkill[];
  onDamagedSkills: PassiveSkill[];
} = (skillIds) => {
  let activeSkills: ActiveSkill[] = [];
  let onAttackSkills: PassiveSkill[] = [];
  let onHitSkills: PassiveSkill[] = [];
  let onDefenceSkills: PassiveSkill[] = [];
  let onDamagedSkills: PassiveSkill[] = [];
  for (const skillId of skillIds) {
    const skill = SKILL_INFO[skillId];
    switch (skill.type) {
      case "active":
        activeSkills.push({ ...skill });
        break;
      case "onAttack":
        onAttackSkills.push({ ...skill });
        break;
      case "onHit":
        onHitSkills.push({ ...skill });
        break;
      case "onDefence":
        onDefenceSkills.push({ ...skill });
        break;
      case "onDamaged":
        onDamagedSkills.push({ ...skill });
        break;
      default:
        break;
    }
  }
  return {
    activeSkills: activeSkills,
    onAttackSkills: onAttackSkills,
    onHitSkills: onHitSkills,
    onDefenceSkills: onDefenceSkills,
    onDamagedSkills: onDamagedSkills,
  };
};
