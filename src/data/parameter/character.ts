import { Status } from "../../types/status";
import { JobId } from "../define/job";

type BattleStatusFormula = {
  [key in JobId]: (level: number) => Status;
};

/**
 * 指定したレベルのベースステータスを返す
 * @param level レベル
 * @returns ステータス
 */
export function calculateBaseStatus(level: number): Status {
  return {
    hp: 20 + level*30,
    atk: 2 + level*3,
    def: 2 + level*3,
    mat: 2 + level*3,
    mdf: 2 + level*3,
    spd: 2 + level*3,
    crt: 5 + Math.floor(level/10),
  };
}

/**
 * 各職業のステータス計算式
 */
const BATTLE_STATUS_FORMULA: BattleStatusFormula = {
  [JobId.Adventurer]: (level) => {
    return {
      hp: 0,
      atk: 0,
      def: 0,
      mat: 0,
      mdf: 0,
      spd: 0,
      crt: 0,
    };
  },
  [JobId.TestJob]: (level) => {
    return {
      hp: level,
      atk: level,
      def: level,
      mat: level,
      mdf: level,
      spd: level,
      crt: 0,
    };
  },
}

/**
 * 指定した職業/レベルのステータスを返す
 * @param jobId 職業Id
 * @param level レベル
 * @returns ステータス
 */
export function calculateJobStatus(jobId: JobId, level: number): Status{
  return BATTLE_STATUS_FORMULA[jobId](level);
}