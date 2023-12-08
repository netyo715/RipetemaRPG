import { JobId } from "../data/define/job";
import { calculateBaseRequirementExp, calculateJobRequirementExp } from "../data/parameter/exp";
import { calculateBaseStatus, calculateJobStatus } from "../data/parameter/character";
import { Job, getDefaultJob } from "./job";
import { Status, margeStatus } from "./status";
import { GearId } from "../data/define/gear";

/**
 * 冒険者
 */
export type Character = {
  index: number;
  name: string;
  level: number;
  exp: number;
  requirementExp: number;
  status: Status;
  baseStatus: Status;
  jobs: {[key in JobId]: Job};
  currentJob: Job;
}

/**
 * 新規キャラクターを返す
 * @returns 新規キャラクター
 */
export function getDefaultCharacter(index: number): Character{
  const status = calculateBaseStatus(1);
  const jobs = {
    [JobId.Adventurer]: getDefaultJob(JobId.Adventurer),
  };
  return {
    index: index,
    name: "新しい冒険者",
    level: 1,
    exp: 0,
    requirementExp: calculateBaseRequirementExp(1),
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
  // キャラクターレベル
  character.exp += exp;
  while (character.exp >= character.requirementExp){
    character.exp -= character.requirementExp;
    character.level += 1;
    character.requirementExp = calculateBaseRequirementExp(character.level);
  }
  // 職業レベル
  const job = character.currentJob;
  job.exp += exp
  while (job.exp >= job.requirementExp){
    job.exp -= job.requirementExp;
    job.level += 1;
    job.requirementExp = calculateJobRequirementExp(job.id, job.level);
  }
  
  calculateCharacterStatus(character);
}

/**
 * ステータスを更新する
 * @param character キャラクター
 */
export function calculateCharacterStatus(character: Character){
  // TODO 装備品も反映
  character.status = margeStatus(
    calculateBaseStatus(character.level),
    calculateJobStatus(character.currentJob.id, character.currentJob.level),
  );
}

/**
 * 職業を変更する
 * @param character 職業を変更するキャラクター
 * @param jobId 変更後の職業
 */
export function changeJob(character: Character, jobId: JobId){
  character.currentJob = character.jobs[jobId];
  calculateCharacterStatus(character);
}

/**
 * 装備する
 * @param character
 * @param gearId
 */
export function equipmentGear(character: Character, gearId: GearId){
  // TODO 装備
}