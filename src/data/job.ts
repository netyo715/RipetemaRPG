import { Status } from "../types/battle";
import { SkillId } from "./skill";

/**
 * 職業ID
 */
export enum JobId {
  冒険者 = "J000",
  戦士 = "J001",
  魔導士 = "J002",
}

/**
 * 職業毎のスキルと必要レベル
 */
export const JOB_SKILL_INFO: JobSkillInfo = {
  [JobId.冒険者]: [],
  [JobId.戦士]: [
    {
      requiredLevel: 0,
      skillId: SkillId.連続切り,
    },
  ],
  [JobId.魔導士]: [
    {
      requiredLevel: 0,
      skillId: SkillId.電撃,
    },
  ],
};

/**
 * 職業/レベル毎の level から level+1 になるための必要経験値を返す関数
 */
const JOB_REQUIRED_EXPERIENCE_INFO: JobRequiredExperienceInfo = {
  [JobId.冒険者]: (level) => {
    return level * 100; //TODO
  },
  [JobId.戦士]: (level) => {
    return level * 100; //TODO
  },
  [JobId.魔導士]: (level) => {
    return level * 100; //TODO
  },
};

const JOB_STATUS_INFO: JobStatusInfo = {
  [JobId.冒険者]: (level) => {
    // TODO 仮
    const ret: Status = {
      hp: level,
      atk: level,
      def: level,
      mat: level,
      mdf: level,
      spd: level,
      hst: level,
      crt: level,
    };
    return ret;
  },
  [JobId.戦士]: (level) => {
    // TODO 仮
    const ret: Status = {
      hp: level,
      atk: level,
      def: level,
      mat: level,
      mdf: level,
      spd: level,
      hst: level,
      crt: level,
    };
    return ret;
  },
  [JobId.魔導士]: (level) => {
    // TODO 仮
    const ret: Status = {
      hp: level,
      atk: level,
      def: level,
      mat: level,
      mdf: level,
      spd: level,
      hst: level,
      crt: level,
    };
    return ret;
  },
};

type JobSkillInfo = {
  [jobId in JobId]: {
    requiredLevel: number;
    skillId: SkillId;
  }[];
};

type JobRequiredExperienceInfo = {
  [jobId in JobId]: (level: number) => number;
};

type JobStatusInfo = {
  [jobId in JobId]: (level: number) => Status;
};

/**
 * 各職業の必要経験値
 * @param jobId 職業ID
 * @param level 現在レベル
 * @returns 次のレベルになるための必要経験値
 */
export const getJobRequiredExperience: (
  jobId: JobId,
  level: number
) => number = (jobId, level) => {
  return JOB_REQUIRED_EXPERIENCE_INFO[jobId](level);
};

/**
 * 各職業のステータス
 * @param jobId 職業ID
 * @param level 現在レベル
 * @returns ステータス
 */
export const getJobStatus: (jobId: JobId, level: number) => Status = (
  jobId,
  level
) => {
  return JOB_STATUS_INFO[jobId](level);
};
