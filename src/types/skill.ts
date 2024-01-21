import { DamageDetail } from "./battle";

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
 * クールダウンを持つスキル
 */
export type ActiveSkill = SkillBase & {
  type: "active";
  firstCastTime?: number;
  recastTime: number;
  effect: () => void;
};

/**
 * 攻撃時に発動するような副次的なスキル
 */
export type PassiveSkill = SkillBase & {
  type: "onAttack" | "onHit" | "onDefence" | "onDamaged";
  rate: number;
  effect: (damage: DamageDetail) => DamageDetail;
};
