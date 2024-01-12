import { GearId } from "../data/gear";
import { JobId } from "../data/job";
import { GearType } from "./gear";

/**
 * 冒険者
 * @param index 何番目の冒険者か
 * @param name 名前
 * @param level レベル
 * @param experience 現在のレベルになってから得た経験値
 * @param currentJobId 現在の職業のID
 * @param jobInfo 職業毎のレベルと経験値
 * @param equippedGear 装備
 */
export type Adventurer = {
  index: number;
  name: string;
  level: number;
  experience: number;
  currentJobId: JobId;
  jobInfo: {
    [jobId in JobId]?: {
      level: number;
      experience: number;
    };
  };
  equippedGear: {
    [gearType in GearType]: GearId|null;
  };
};
