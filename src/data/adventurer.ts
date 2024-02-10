import { Status } from "../types/battle";

/**
 * 必要経験値
 * @param level 現在レベル
 * @returns 次のレベルになるための必要経験値
 */
export const getRequiredExperience: (level: number) => number = (level) => {
  return level * 10 + Math.ceil(3 * 1.2 ** level);
};

/**
 * 冒険者の職業、装備等を除いた基本のステータス
 * @param level
 * @returns ステータス
 */
export const getBaseStatus: (level: number) => Status = (level) => {
  // TODO 仮
  const ret: Status = {
    hp: 50 + level * 10,
    atk: 5 + level,
    def: 5 + level,
    mat: 5 + level,
    mdf: 5 + level,
    spd: 5 + level,
    hst: 0,
    crt: 5 + Math.round(level / 10),
    hat: 100,
  };
  return ret;
};
