import { MonsterId } from "../data/monster";

/**
 * ダンジョン
 */
export type Dungeon = {
  name: string;
  areas: Area[];
};

/**
 * エリア
 * @param name エリア名
 * @param monsterPatterns 各パターンはweight/全体のweightの確率で選ばれる
 */
export type Area = {
  name: string;
  monsterPatterns: MonsterPattern[];
};

/**
 * モンスター出現パターン
 */
export type MonsterPattern = {
  monsterIds: MonsterId[];
  weight: number;
};
