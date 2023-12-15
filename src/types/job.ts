import { JobId } from "../data/define/job";
import { calculateJobRequirementExp } from "../data/parameter/exp";
import { JOB_NAME } from "../data/parameter/job";

/**
 * 職業
 */
export type Job = {
  id: JobId;
  name: string;
  level: number;
  exp: number;
  requirementExp: number;
}

/**
 * 指定した職業の初期状態を返す
 * @param jobId 
 * @returns 初期状態の職業
 */
export function getDefaultJob(jobId: JobId): Job{
  return {
    id: jobId,
    name: JOB_NAME[jobId],
    level: 1,
    exp: 0,
    requirementExp: calculateJobRequirementExp(jobId, 1),
  };
}