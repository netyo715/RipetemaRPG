import { JobId } from "../data/define/job";
import { calculateBaseRequirementExp, calculateJobRequirementExp } from "../data/parameter/exp";
import { calculateBaseStatus, calculateJobStatus } from "../data/parameter/character";
import { Job, getDefaultJob } from "./job";
import { Status, margeStatus } from "./status";
import { GearId } from "../data/define/gear";
import { GearInfos, GearType } from "./gear";
import { GEAR_INFO } from "../data/parameter/gear";
import { idText } from "typescript";

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
  jobs: {[key in JobId]: Job|null};
  currentJobId: JobId;
  gear: {[key in GearType]: GearId|null};
}

/**
 * 新規キャラクターを返す
 * @returns 新規キャラクター
 */
export function getDefaultCharacter(index: number): Character{
  const status = calculateBaseStatus(1);
  const jobs = {
    [JobId.Adventurer]: getDefaultJob(JobId.Adventurer),
    [JobId.TestJob]: null,
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
    currentJobId: JobId.Adventurer,
    gear: {
      [GearType.Weapon]: null,
      [GearType.Shield]: null,
      [GearType.Head]: null,
      [GearType.Body]: null,
      [GearType.Hand]: null,
      [GearType.Leg]: null,
      [GearType.Accessory]: null
    }
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
  const job = character.jobs[character.currentJobId]!;
  job.exp += exp
  while (job.exp >= job.requirementExp){
    job.exp -= job.requirementExp;
    job.level += 1;
    job.requirementExp = calculateJobRequirementExp(job.id, job.level);
  }

  updateCharacterStatus(character);
}

/**
 * ステータスを更新する
 * @param character キャラクター
 */
export function updateCharacterStatus(character: Character){
  // TODO 装備と職業のスキルも反映
  const gear = character.gear;
  character.status = margeStatus(
    calculateBaseStatus(character.level),
    calculateJobStatus(character.currentJobId, character.jobs[character.currentJobId]!.level),
    ...[
      gear[GearType.Weapon],
      gear[GearType.Shield],
      gear[GearType.Head],
      gear[GearType.Body],
      gear[GearType.Hand],
      gear[GearType.Leg],
      gear[GearType.Accessory],
    ].filter(arg => arg !== null).map(arg => GEAR_INFO[arg!].status),
  );
}

/**
 * 職業を変更する
 * @param character 職業を変更するキャラクター
 * @param jobId 変更後の職業
 */
export function changeJob(character: Character, jobId: JobId){
  character.currentJobId = jobId;
  updateCharacterStatus(character);
}

/**
 * 装備する
 * キャラクターの装備と装備所持状況を更新する
 * @param character
 * @param gearId
 */
export function equipmentGear(character: Character, gearInfos: GearInfos, gearIndex: number){
  const equipGearInfo = gearInfos[gearIndex];
  const gearType = GEAR_INFO[equipGearInfo.gearId].type;
  const unequipGear = character.gear[gearType];
  if (unequipGear !== null){
    gearInfos.forEach((value) => {
      if (value.gearId === unequipGear && value.equippedCharacterIndex === character.index){
        value.equippedCharacterIndex = null;
      }
    });
  }
  character.gear[gearType] = equipGearInfo.gearId;
  gearInfos[gearIndex].equippedCharacterIndex = character.index;
  updateCharacterStatus(character);
}