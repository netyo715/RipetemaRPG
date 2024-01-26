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
    recastTime: 5000, // TODO
    remainingRecastTime: 5000,
    effect: () => {
      // TODO
    },
  },
  [SkillId.電撃]: {
    type: "active",
    name: "電撃",
    detail: "全ての敵に雷で攻撃する",
    recastTime: 5000, // TODO,
    remainingRecastTime: 5000,
    effect: () => {
      // TODO
    },
  },
};

type SkillInfo = {
  [skillId in SkillId]: Skill;
};
