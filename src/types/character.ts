import { JobId } from "../data/define/job";
import { calculateBaseRequirementExp, calculateJobRequirementExp } from "../data/parameter/exp";
import { calculateBaseStatus } from "../data/parameter/character";
import { Job, getDefaultJob } from "./job";
import { Status, margeStatus } from "./status";

/**
 * 冒険者
 */
export type Character = {
  id: number;
  name: string;
  level: number;
  exp: number;
  status: Status;
  baseStatus: Status;
  jobs: {[key in JobId]: Job};
  currentJob: Job;
}

/**
 * 新規キャラクターを返す
 * @returns 新規キャラクター
 */
export function getDefaultCharacter(id: number): Character{
  const status = calculateBaseStatus(1);
  const jobs = {
    [JobId.Adventurer]: getDefaultJob(JobId.Adventurer),
  };
  return {
    id: id,
    name: "新しい冒険者",
    level: 1,
    exp: 0,
    status: margeStatus(status, jobs[JobId.Adventurer].jobStatus),
    baseStatus: status,
    jobs: jobs,
    currentJob: jobs[JobId.Adventurer],
  };
}

/**
 * 経験値取得
 * @param character 経験値を取得するキャラクター
 * @param exp 経験値増加分
 */
export function gainExp(character: Character, exp: number){
  const baseRequirementExp = calculateBaseRequirementExp(character.level);
  character.exp += exp;
  if (character.exp >= baseRequirementExp){
    character.exp -= baseRequirementExp;
    character.level += 1;
  } 

  const job = character.currentJob;
  const jobRequirementExp = calculateJobRequirementExp(job.id, job.level);
  job.exp += exp
  if (job.exp >= jobRequirementExp){
    job.exp -= jobRequirementExp;
    job.level += 1;
  }

  updateCharacterStatus(character);
}

/**
 * ステータスを更新する
 * @param character キャラクター
 */
export function updateCharacterStatus(character: Character){
  character.status = margeStatus(
    character.baseStatus,
    character.currentJob.jobStatus
  );
}

/**
 * 職業を変更する
 * @param character 職業を変更するキャラクター
 * @param jobId 変更後の職業
 */
export function changeJob(character: Character, jobId: JobId){
  character.currentJob = character.jobs[jobId];
  updateCharacterStatus(character);
}