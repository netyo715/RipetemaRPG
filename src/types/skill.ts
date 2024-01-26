import { BattleUnit, DamageDetail } from "./battle";

/**
 * スキルの名前と概要
 */
export type SkillBase = {
  name: string;
  detail: string;
};

/**
 * 任意のスキル
 */
export type Skill = ActiveSkill | PassiveSkill;

/**
 * 任意のアクティブアクション
 */
export type ActiveAction = ActiveSkill | NormalAttack;

/**
 * 通常攻撃
 */
export type NormalAttack = SkillBase & {
  type: "normal";
  recastTime: number;
  remainingRecastTime: number;
  effect: (
    caster: BattleUnit,
    allies: BattleUnit[],
    enemies: BattleUnit[]
  ) => void;
};

/**
 * クールダウンを持つスキル
 */
export type ActiveSkill = SkillBase & {
  type: "active";
  recastTime: number;
  remainingRecastTime: number;
  effect: () => void;
};

/**
 * アクション時に発動する副次的なスキル
 */
export type PassiveSkill = SkillBase & {
  type: "onCast" | "onAttack" | "onHit" | "onDefence" | "onDamaged";
  effect: (damage: DamageDetail) => DamageDetail;
};
