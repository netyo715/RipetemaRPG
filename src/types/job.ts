import { JobId } from "../data/define/job";
import { calculateJobStatus } from "../data/parameter/character";
import { Status } from "./status";

/**
 * 職業
 */
export type Job = {
  id: JobId;
  level: number;
  exp: number;
  jobStatus: Status;
}

/**
 * 指定した職業の初期状態を返す
 * @param jobId 
 * @returns 初期状態の職業
 */
export function getDefaultJob(jobId: JobId): Job{
  return {
    id: jobId,
    level: 1,
    exp: 0,
    jobStatus: calculateJobStatus(jobId, 1),
  };
}