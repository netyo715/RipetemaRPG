import { ItemId } from "../data/item";
import { MONSTER_INFO, MonsterId } from "../data/monster";
import { SKILL_INFO, SkillId } from "../data/skill";
import { Adventurer } from "../types/adventurer";
import { BattleUnit, DamageDetail } from "../types/battle";
import { MonsterPattern } from "../types/dungeon";
import { ActiveSkill, NormalAttack, PassiveSkill } from "../types/skill";
import { getAdventurerSkillIds, getAdventurerStatus } from "./adventurer";
import { getRandomId, getRandomValue, sum } from "./util";

/**
 * 冒険者から戦闘ユニットオブジェクトを作成する
 * @param adventurer 冒険者
 * @returns 戦闘ユニットオブジェクト
 */
export const createBattleUnitFromAdventurer = (
  adventurer: Adventurer
): BattleUnit => {
  const status = getAdventurerStatus(adventurer);
  const skillIds = getAdventurerSkillIds(adventurer);
  const [activeSkills, passiveSkills] = getBattleUnitSkills(skillIds);
  const unit: BattleUnit = {
    id: getRandomId(),
    name: adventurer.name,
    status: { currentHp: status.hp, ...status },
    activeActions: [
      getNormalAttack(adventurer.name, status.spd),
      ...activeSkills,
    ],
    passiveSkills: passiveSkills,
    isAdventurer: true,
    isAlive: true,
  };
  return unit;
};

/**
 * モンスターIDから戦闘ユニットオブジェクトを作成する
 * @param monsterId モンスターのID
 * @returns 戦闘ユニットオブジェクト
 */
export const createBattleUnitFromMonsterId = (
  monsterId: MonsterId
): BattleUnit => {
  const monster = MONSTER_INFO[monsterId];
  const skillIds = monster.skillIds;
  const [activeSkills, passiveSkills] = getBattleUnitSkills(skillIds);
  const unit: BattleUnit = {
    id: getRandomId(),
    name: monster.name,
    status: { currentHp: monster.status.hp, ...monster.status },
    activeActions: [
      getNormalAttack(monster.name, monster.status.spd),
      ...activeSkills,
    ],
    passiveSkills: passiveSkills,
    isAdventurer: false,
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
export const getBattleUnitSkills = (
  skillIds: SkillId[]
): [
  ActiveSkill[],
  {
    onAttackSkills: PassiveSkill[];
    onHitSkills: PassiveSkill[];
    onDefenceSkills: PassiveSkill[];
    onDamagedSkills: PassiveSkill[];
  }
] => {
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
  return [
    activeSkills,
    {
      onAttackSkills: onAttackSkills,
      onHitSkills: onHitSkills,
      onDefenceSkills: onDefenceSkills,
      onDamagedSkills: onDamagedSkills,
    },
  ];
};

/**
 * 通常攻撃
 * @param name ユニットの名前(ログ出力用)
 * @param spd 素早さ(リキャストタイム計算用)
 * @returns 通常攻撃
 */
export const getNormalAttack = (name: string, spd: number): NormalAttack => {
  let attack: NormalAttack = {
    name: "通常攻撃",
    detail: "最も基本的な攻撃",
    type: "normal",
    recastTime: 5000 - spd * 40, // TODO 攻撃速度調整
    remainingRecastTime: 5000 - spd * 40,
    effect: (
      caster: BattleUnit,
      allies: BattleUnit[],
      enemies: BattleUnit[],
      sendLog: (log: string) => void
    ) => {
      // 相手を抽選する
      const target = getRandomUnitWithHat(enemies);
      // 基本ダメージを決める
      const damageDetail: DamageDetail = {
        isCritical: false,
        isSkill: false,
        damages: [
          { isSkill: false, physicalDamage: caster.status.atk, magicDamage: 0 },
        ],
      };
      // クリティカル判定
      // onCast発動
      // onAttack発動
      // 相手のonDefence発動
      // ダメージ与える
      sendLog(`${caster.name}の通常攻撃`);
      let reducedHp = causeDamage(target, damageDetail);
      sendLog(`${target.name}に${reducedHp}ダメージ`);
      // onHit発動
      if (!target.isAlive) {
        sendLog(`${target.name}は倒れた`);
      }
      // 相手のonDamaged発動
      // ログ出力
    }, //TODO 書く
  };
  return attack;
};

/**
 * ダメージ処理
 * @param unit ダメージを受けるユニット
 * @param damageDetail ダメージ
 * @returns 実際に与えたダメージ
 */
export const causeDamage = (
  unit: BattleUnit,
  damageDetail: DamageDetail
): number => {
  let damageSum = 0;
  damageDetail.damages.forEach((damage) => {
    // TODO 防御やクリティカルを考慮したダメージ計算
    damageSum += damage.physicalDamage;
    damageSum -= damage.magicDamage;
  });
  unit.status.currentHp = Math.max(unit.status.currentHp - damageSum, 0);
  if (unit.status.currentHp <= 0) {
    unit.isAlive = false;
  }
  return damageSum;
};

/**
 * hat(狙われやすさ)を考慮してユニットを返す
 * @param units
 * @param isAliveOnly 生きているユニットのみ
 * @returns
 */
export const getRandomUnitWithHat = (
  units: BattleUnit[],
  isAliveOnly: boolean = true
): BattleUnit => {
  let hatSum = 0;
  const filteredUnits = units.filter((unit) => !isAliveOnly || unit.isAlive);
  filteredUnits.forEach((unit) => (hatSum += unit.status.hat));
  let num = Math.random() * hatSum;
  for (const unit of filteredUnits) {
    num -= unit.status.hat;
    if (num < 0) return unit;
  }
  throw Error;
};

/**
 * ドロップするアイテムを取得
 * @param monsterIds
 * @returns アイテムと個数の組のarray
 */
export const getDropItem = (
  monsterIds: MonsterId[]
): { itemId: ItemId; amount: number }[] => {
  let dropped: { itemId: ItemId; amount: number }[] = [];
  monsterIds
    .map((monsterId) => MONSTER_INFO[monsterId].lootTable)
    .forEach((table) => {
      const weightSum =
        sum(table.loots.map((loot) => loot.weight)) + table.nonDropWeight;
      let num = Math.random() * weightSum;
      for (const loot of table.loots) {
        num -= loot.weight;
        if (num < 0) {
          dropped.push({ itemId: loot.itemId, amount: loot.amount });
          break;
        }
      }
    });
  return dropped;
};
