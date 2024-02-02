import { getBaseStatus, getRequiredExperience } from "../data/adventurer";
import { GEAR_INFO } from "../data/gear";
import { JOB_SKILL_INFO, JobId, getJobStatus } from "../data/job";
import { SkillId } from "../data/skill";
import { Adventurer } from "../types/adventurer";
import { Status } from "../types/battle";

/**
 * 冒険者の合計ステータス
 * @param adventurer 冒険者
 * @param jobId 職業 指定しない場合は現在の職業
 * @param includeGear 装備を含めるか
 * @returns 冒険者、職業、装備の合計ステータス
 */
export const getAdventurerStatus = (
  adventurer: Adventurer,
  jobId?: JobId,
  includeGear: boolean = true
): Status => {
  const baseStatus = getBaseStatus(adventurer.level);
  const jobStatus = getJobStatus(
    jobId || adventurer.currentJobId,
    adventurer.jobInfo[adventurer.currentJobId]!.level
  );
  const gearStatuses = includeGear
    ? Object.values(adventurer.equippedGear)
        .filter((gearId) => gearId !== null)
        .map((gearId) => GEAR_INFO[gearId!].status)
    : [];
  return mergeStatus(baseStatus, jobStatus, ...gearStatuses);
};

/**
 * 冒険者のスキル
 * @param adventurer 冒険者
 * @returns 使用可能なスキル
 */
export const getAdventurerSkillIds = (adventurer: Adventurer): SkillId[] => {
  const jobId = adventurer.currentJobId;
  const jobLevel = adventurer.jobInfo[jobId]!.level;
  let skillIds: SkillId[] = [];
  for (const info of JOB_SKILL_INFO[jobId]) {
    if (info.requiredLevel <= jobLevel) {
      skillIds.push(info.skillId);
    }
  }
  return skillIds;
};

/**
 * ステータスを合算する
 * @param statuses ステータス
 * @returns 合計ステータス
 */
const mergeStatus = (...statuses: Partial<Status>[]): Status => {
  const statusSum: Status = {
    hp: 0,
    atk: 0,
    def: 0,
    mat: 0,
    mdf: 0,
    spd: 0,
    hst: 0,
    crt: 0,
    hat: 0,
  };
  statuses.forEach((status) => {
    for (const key of Object.keys(status) as (keyof Status)[]) {
      statusSum[key] += status[key]!;
    }
  });
  return statusSum;
};
