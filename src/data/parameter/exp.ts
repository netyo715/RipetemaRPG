import { JobId } from "../define/job";

type RequirementExpFormula = {
  [key in JobId]: (level: number) => number;
};

/**
 * ベースレベルをlevelからlevel+1にするのに必要な経験値を計算する
 * @param level 現在レベル
 * @returns 必要経験値
 */
export function calculateBaseRequirementExp(level: number): number {
  return 100 * level; // TODO 必要経験値考える
}

/**
 * 職業毎の必要経験値
 */
const REQUIREMENT_EXP_FORMULA: RequirementExpFormula = {
  [JobId.Adventurer]: (level) => 100 * level, // TODO 必要経験値考える
  [JobId.TestJob]: (level) => 100 * level,
}

/**
* 指定した職業のレベルをlevelからlevel+1にするのに必要な経験値を計算する
* @param jobId 職業Id
* @param level レベル
* @returns 必要経験値
*/
export function calculateJobRequirementExp(jobId: JobId, level: number): number{
  return REQUIREMENT_EXP_FORMULA[jobId](level);
}