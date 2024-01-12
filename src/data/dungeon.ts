import { Dungeon } from "../types/dungeon";
import { MonsterId } from "./monster";

/**
 * ダンジョン
 */
export const DUNGEONS: Dungeon[] = [
  {
    // TODO 仮
    name: "草原",
    areas: [
      {
        name: "草原入口",
        monsterPatterns: [
          {
            monsterIds: [MonsterId.スライム],
            weight: 2,
          },
          {
            monsterIds: [MonsterId.スライム, MonsterId.スライム],
            weight: 1,
          },
        ],
      },
    ],
  },
];
