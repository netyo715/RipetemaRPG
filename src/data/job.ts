import { Status } from "../types/battle";
import { SkillId } from "./skill";

/**
 * 職業ID
 */
export enum JobId {
  村人 = "J000",
  戦士 = "J001",
  魔導士 = "J002",
}

/**
 * 職業の名前
 */
export const JOB_NAME: JobName = {
  [JobId.村人]: "村人",
  [JobId.戦士]: "戦士",
  [JobId.魔導士]: "魔導士",
};

/**
 * 職業毎のスキルと必要レベル
 */
export const JOB_SKILL_INFO: JobSkillInfo = {
  [JobId.村人]: [],
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
  [JobId.村人]: (level) => {
    return level * 10 + Math.ceil(3 * 1.2 ** level);
  },
  [JobId.戦士]: (level) => {
    return level * 10 + Math.ceil(4.5 * 1.2 ** level);
  },
  [JobId.魔導士]: (level) => {
    return level * 10 + Math.ceil(4.5 * 1.2 ** level);
  },
};

const JOB_STATUS_INFO: JobStatusInfo = {
  [JobId.村人]: (level) => {
    const ret: Status = {
      hp: level,
      atk: level,
      def: level,
      mat: level,
      mdf: level,
      spd: level,
      hst: 0,
      crt: 0,
      hat: 0,
    };
    return ret;
  },
  [JobId.戦士]: (level) => {
    const ret: Status = {
      hp: level * 30,
      atk: level * 3,
      def: level * 3,
      mat: level,
      mdf: level,
      spd: level * 2,
      hst: 0,
      crt: 0,
      hat: 50,
    };
    return ret;
  },
  [JobId.魔導士]: (level) => {
    const ret: Status = {
      hp: level * 10,
      atk: level,
      def: level,
      mat: level * 3,
      mdf: level * 3,
      spd: level,
      hst: Math.floor(level * 0.3),
      crt: 0,
      hat: -50,
    };
    return ret;
  },
};

type JobName = {
  [jobId in JobId]: string;
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
