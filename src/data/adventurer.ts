import { Status } from "../types/battle";

/**
 * 必要経験値
 * @param level 現在レベル
 * @returns 次のレベルになるための必要経験値
 */
export const getRequiredExperience: (level: number) => number = (level) => {
  return level * 100; //TODO
};

/**
 * 冒険者の職業、装備等を除いた基本のステータス
 * @param level
 * @returns ステータス
 */
export const getBaseStatus: (level: number) => Status = (level) => {
  // TODO 仮
  const ret: Status = {
    hp: level * 50,
    atk: level,
    def: level,
    mat: level,
    mdf: level,
    spd: level,
    hst: level,
    crt: level,
  };
  return ret;
};
