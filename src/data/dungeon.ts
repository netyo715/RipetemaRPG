import { Dungeon } from "../types/dungeon";
import { MonsterId } from "./monster";

/**
 * ダンジョン
 */
export const DUNGEONS: Dungeon[] = [
  {
    name: "草原",
    areas: [
      {
        name: "草原の入口",
        monsterPatterns: [
          {
            monsterIds: [MonsterId.スライム],
            weight: 1,
          },
        ],
      },
      {
        name: "丘陵",
        monsterPatterns: [
          {
            monsterIds: [MonsterId.スライム, MonsterId.スライム],
            weight: 1,
          },
          {
            monsterIds: [MonsterId.つのうさぎ],
            weight: 1,
          },
        ],
      },
    ],
  },
];
