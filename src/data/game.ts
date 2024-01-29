import { AdventurerData } from "../types/game";
import { JobId } from "./job";

/**
 * ゲームバージョン
 */
export const GAME_VERSION = "0.0.0";

/**
 * オートセーブの間隔
 */
// export const AUTO_SAVE_INTERVAL = 30000;
export const AUTO_SAVE_INTERVAL = 4000; // TODO デバッグ用

/**
 * ログの最大行数
 */
export const LOG_LINE_MAX = 50;

/**
 * 冒険者データの初期値
 */
export const INITIAL_ADVENTURER_DATA: AdventurerData = [
  {
    index: 0,
    name: "新しい冒険者",
    level: 1,
    experience: 0,
    currentJobId: JobId.冒険者,
    jobInfo: { [JobId.冒険者]: { level: 1, experience: 0 } },
    equippedGear: {
      weapon: null,
      shield: null,
      head: null,
      body: null,
      arm: null,
      leg: null,
      other: null,
    },
  },
];

/**
 * フラグID
 */
export enum FlagId {
  "冒険者二人目利用可能" = "F000",
}
