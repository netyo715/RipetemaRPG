import { Skill } from "../types/skill";

/**
 * スキルID
 */
export enum SkillId {
  連続切り = "S000",
  電撃 = "S001",
}

/**
 * スキル詳細
 */
export const SKILL_INFO: SkillInfo = {
  [SkillId.連続切り]: {
    type: "active",
    name: "連続切り",
    detail: "同じ敵を2度切りつける",
    cooldown: 5000, // TODO
    rate: 50, // TODO
    effect: () => {
      // TODO
    },
  },
  [SkillId.電撃]: {
    type: "active",
    name: "電撃",
    detail: "全ての敵に雷で攻撃する",
    cooldown: 5000, // TODO,
    rate: 50, // TODO
    effect: () => {
      // TODO
    },
  },
};

type SkillInfo = {
  [skillId in SkillId]: Skill;
};
